import { BadRequestException, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { AccessCore, IAccessRepository, Permission } from '../access';
import { AssetResponseDto, BulkIdErrorReason, BulkIdResponseDto, mapAsset } from '../asset';
import { AuthUserDto } from '../auth';
import { mimeTypes } from '../domain.constant';
import { IJobRepository, JobName } from '../job';
import { IStorageRepository, ImmichReadStream } from '../storage';
import { ISystemConfigRepository, SystemConfigCore } from '../system-config';
import {
  MergePersonDto,
  PeopleResponseDto,
  PeopleUpdateDto,
  PersonResponseDto,
  PersonSearchDto,
  PersonUpdateDto,
  mapPerson,
} from './person.dto';
import { IPersonRepository, UpdateFacesData } from './person.repository';

@Injectable()
export class PersonService {
  private access: AccessCore;
  private configCore: SystemConfigCore;
  readonly logger = new Logger(PersonService.name);

  constructor(
    @Inject(IAccessRepository) private accessRepository: IAccessRepository,
    @Inject(IPersonRepository) private repository: IPersonRepository,
    @Inject(ISystemConfigRepository) configRepository: ISystemConfigRepository,
    @Inject(IStorageRepository) private storageRepository: IStorageRepository,
    @Inject(IJobRepository) private jobRepository: IJobRepository,
  ) {
    this.access = new AccessCore(accessRepository);
    this.configCore = new SystemConfigCore(configRepository);
  }

  async getAll(authUser: AuthUserDto, dto: PersonSearchDto): Promise<PeopleResponseDto> {
    const { machineLearning } = await this.configCore.getConfig();
    const people = await this.repository.getAllForUser(authUser.id, {
      minimumFaceCount: machineLearning.facialRecognition.minFaces,
      withHidden: dto.withHidden || false,
    });
    const persons: PersonResponseDto[] = people
      // with thumbnails
      .filter((person) => !!person.thumbnailPath)
      .map((person) => mapPerson(person));

    return {
      people: persons.filter((person) => dto.withHidden || !person.isHidden),
      total: persons.length,
      visible: persons.filter((person: PersonResponseDto) => !person.isHidden).length,
    };
  }

  async getById(authUser: AuthUserDto, id: string): Promise<PersonResponseDto> {
    await this.access.requirePermission(authUser, Permission.PERSON_READ, id);
    return this.findOrFail(id).then(mapPerson);
  }

  async getThumbnail(authUser: AuthUserDto, id: string): Promise<ImmichReadStream> {
    await this.access.requirePermission(authUser, Permission.PERSON_READ, id);
    const person = await this.repository.getById(id);
    if (!person || !person.thumbnailPath) {
      throw new NotFoundException();
    }

    return this.storageRepository.createReadStream(person.thumbnailPath, mimeTypes.lookup(person.thumbnailPath));
  }

  async getAssets(authUser: AuthUserDto, id: string): Promise<AssetResponseDto[]> {
    await this.access.requirePermission(authUser, Permission.PERSON_READ, id);
    const assets = await this.repository.getAssets(id);
    return assets.map(mapAsset);
  }

  async update(authUser: AuthUserDto, id: string, dto: PersonUpdateDto): Promise<PersonResponseDto> {
    await this.access.requirePermission(authUser, Permission.PERSON_WRITE, id);
    let person = await this.findOrFail(id);

    if (dto.name !== undefined || dto.birthDate !== undefined || dto.isHidden !== undefined) {
      person = await this.repository.update({ id, name: dto.name, birthDate: dto.birthDate, isHidden: dto.isHidden });
      if (this.needsSearchIndexUpdate(dto)) {
        const assets = await this.repository.getAssets(id);
        const ids = assets.map((asset) => asset.id);
        await this.jobRepository.queue({ name: JobName.SEARCH_INDEX_ASSET, data: { ids } });
      }
    }

    if (dto.featureFaceAssetId) {
      const assetId = dto.featureFaceAssetId;
      const face = await this.repository.getFaceById({ personId: id, assetId });
      if (!face) {
        throw new BadRequestException('Invalid assetId for feature face');
      }

      await this.jobRepository.queue({
        name: JobName.GENERATE_FACE_THUMBNAIL,
        data: {
          personId: id,
          assetId,
          boundingBox: {
            x1: face.boundingBoxX1,
            x2: face.boundingBoxX2,
            y1: face.boundingBoxY1,
            y2: face.boundingBoxY2,
          },
          imageHeight: face.imageHeight,
          imageWidth: face.imageWidth,
        },
      });
    }

    return mapPerson(person);
  }

  async updatePeople(authUser: AuthUserDto, dto: PeopleUpdateDto): Promise<BulkIdResponseDto[]> {
    const results: BulkIdResponseDto[] = [];
    for (const person of dto.people) {
      try {
        await this.update(authUser, person.id, {
          isHidden: person.isHidden,
          name: person.name,
          birthDate: person.birthDate,
          featureFaceAssetId: person.featureFaceAssetId,
        }),
          results.push({ id: person.id, success: true });
      } catch (error: Error | any) {
        this.logger.error(`Unable to update ${person.id} : ${error}`, error?.stack);
        results.push({ id: person.id, success: false, error: BulkIdErrorReason.UNKNOWN });
      }
    }
    return results;
  }

  async handlePersonCleanup() {
    const people = await this.repository.getAllWithoutFaces();
    for (const person of people) {
      this.logger.debug(`Person ${person.name || person.id} no longer has any faces, deleting.`);
      try {
        await this.repository.delete(person);
        await this.jobRepository.queue({ name: JobName.DELETE_FILES, data: { files: [person.thumbnailPath] } });
      } catch (error: Error | any) {
        this.logger.error(`Unable to delete person: ${error}`, error?.stack);
      }
    }

    return true;
  }

  async mergePerson(authUser: AuthUserDto, id: string, dto: MergePersonDto): Promise<BulkIdResponseDto[]> {
    const mergeIds = dto.ids;
    await this.access.requirePermission(authUser, Permission.PERSON_READ, id);
    const primaryPerson = await this.findOrFail(id);
    const primaryName = primaryPerson.name || primaryPerson.id;

    const results: BulkIdResponseDto[] = [];

    await this.access.requirePermission(authUser, Permission.PERSON_WRITE, primaryPerson.id);
    for (const mergeId of mergeIds) {
      const hasPermission = await this.access.hasPermission(authUser, Permission.PERSON_MERGE, mergeId);

      if (!hasPermission) {
        results.push({ id: mergeId, success: false, error: BulkIdErrorReason.NO_PERMISSION });
        continue;
      }

      try {
        const mergePerson = await this.repository.getById(mergeId);
        if (!mergePerson) {
          results.push({ id: mergeId, success: false, error: BulkIdErrorReason.NOT_FOUND });
          continue;
        }

        const mergeName = mergePerson.name || mergePerson.id;
        const mergeData: UpdateFacesData = { oldPersonId: mergeId, newPersonId: id };
        this.logger.log(`Merging ${mergeName} into ${primaryName}`);

        const assetIds = await this.repository.prepareReassignFaces(mergeData);
        for (const assetId of assetIds) {
          await this.jobRepository.queue({ name: JobName.SEARCH_REMOVE_FACE, data: { assetId, personId: mergeId } });
        }
        await this.repository.reassignFaces(mergeData);
        await this.repository.delete(mergePerson);

        this.logger.log(`Merged ${mergeName} into ${primaryName}`);
        results.push({ id: mergeId, success: true });
      } catch (error: Error | any) {
        this.logger.error(`Unable to merge ${mergeId} into ${id}: ${error}`, error?.stack);
        results.push({ id: mergeId, success: false, error: BulkIdErrorReason.UNKNOWN });
      }
    }

    // Re-index all faces in typesense for up-to-date search results
    await this.jobRepository.queue({ name: JobName.SEARCH_INDEX_FACES });

    return results;
  }

  /**
   * Returns true if the given person update is going to require an update of the search index.
   * @param dto the Person going to be updated
   * @private
   */
  private needsSearchIndexUpdate(dto: PersonUpdateDto): boolean {
    return dto.name !== undefined || dto.isHidden !== undefined;
  }

  private async findOrFail(id: string) {
    const person = await this.repository.getById(id);
    if (!person) {
      throw new BadRequestException('Person not found');
    }
    return person;
  }
}
