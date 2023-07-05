import { AssetFaceId, IPersonRepository, PersonSearchOptions } from '@app/domain';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { AssetEntity, AssetFaceEntity, PersonEntity } from '../entities';

export class PersonRepository implements IPersonRepository {
  constructor(
    @InjectRepository(AssetEntity) private assetRepository: Repository<AssetEntity>,
    @InjectRepository(PersonEntity) private personRepository: Repository<PersonEntity>,
    @InjectRepository(AssetFaceEntity) private assetFaceRepository: Repository<AssetFaceEntity>,
  ) {}

  async updateAssetsId(primaryPersonId: string, mergePersonId: string): Promise<number> {
    const result = await this.assetFaceRepository
      .createQueryBuilder()
      .update()
      .set({ personId: primaryPersonId })
      .where({ personId: mergePersonId })
      .execute();

    return result.affected ?? 0;
  }

  /**
   * Delete the assets that containers faces from both persons.
   * Normally, this shouldn't happen, however there are some edge cases, where your photo is taken
   * with an older version of your self, and the face detection algorithm detects both faces as different.
   * @param ids Array of personId.
   * @returns sAn array of assetId that contains faces from both persons.
   */
  async deleteIdenticalAssets(primaryPersonId: string, mergePersonId: string): Promise<string[]> {
    const duplicatedAssets = await this.assetFaceRepository
      .createQueryBuilder('af')
      .select('af."assetId"')
      .where(`af."personId" IN (:...ids)`, {
        ids: [primaryPersonId, mergePersonId],
      })
      .groupBy('af."assetId"')
      .having('COUNT(af."personId") > 1')
      .getRawMany();

    const deleteIds = duplicatedAssets.map((r) => r.assetId);

    await this.assetFaceRepository.delete({
      assetId: In(deleteIds),
      personId: mergePersonId,
    });

    return deleteIds;
  }

  delete(entity: PersonEntity): Promise<PersonEntity | null> {
    return this.personRepository.remove(entity);
  }

  async deleteAll(): Promise<number> {
    const people = await this.personRepository.find();
    await this.personRepository.remove(people);
    return people.length;
  }

  getAll(userId: string, options?: PersonSearchOptions): Promise<PersonEntity[]> {
    return this.personRepository
      .createQueryBuilder('person')
      .leftJoin('person.faces', 'face')
      .where('person.ownerId = :userId', { userId })
      .orderBy('COUNT(face.assetId)', 'DESC')
      .having('COUNT(face.assetId) >= :faces', { faces: options?.minimumFaceCount || 1 })
      .groupBy('person.id')
      .limit(500)
      .getMany();
  }

  getAllWithoutFaces(): Promise<PersonEntity[]> {
    return this.personRepository
      .createQueryBuilder('person')
      .leftJoin('person.faces', 'face')
      .having('COUNT(face.assetId) = 0')
      .groupBy('person.id')
      .getMany();
  }

  getById(ownerId: string, personId: string): Promise<PersonEntity | null> {
    return this.personRepository.findOne({ where: { id: personId, ownerId } });
  }

  getAssets(ownerId: string, personId: string): Promise<AssetEntity[]> {
    return this.assetRepository.find({
      where: {
        ownerId,
        faces: {
          personId,
        },
        isVisible: true,
        isArchived: false,
      },
      relations: {
        faces: {
          person: true,
        },
        exifInfo: true,
      },
      order: {
        fileCreatedAt: 'desc',
      },
      // TODO: remove after either (1) pagination or (2) time bucket is implemented for this query
      take: 1000,
    });
  }

  create(entity: Partial<PersonEntity>): Promise<PersonEntity> {
    return this.personRepository.save(entity);
  }

  async update(entity: Partial<PersonEntity>): Promise<PersonEntity> {
    const { id } = await this.personRepository.save(entity);
    return this.personRepository.findOneByOrFail({ id });
  }

  async getFaceById({ personId, assetId }: AssetFaceId): Promise<AssetFaceEntity | null> {
    return this.assetFaceRepository.findOneBy({ assetId, personId });
  }

  getAssetsCount(personId: string): Promise<number> {
    return this.assetRepository.count({ where: { faces: { personId } } });
  }
}
