import { Inject, Logger } from '@nestjs/common';
import { join } from 'path';
import { IAssetRepository, WithoutProperty } from '../asset';
import { MACHINE_LEARNING_BATCH_SIZE, MACHINE_LEARNING_ENABLED } from '../domain.constant';
import { batched, notNull, usePagination } from '../domain.util';
import {
  IBaseJob,
  IBulkEntityJob,
  IFaceThumbnailJob,
  IJobRepository,
  JobName,
  JOBS_ASSET_PAGINATION_SIZE,
} from '../job';
import { CropOptions, FACE_THUMBNAIL_SIZE, IMediaRepository } from '../media';
import { IPersonRepository } from '../person/person.repository';
import { ISearchRepository } from '../search/search.repository';
import { IMachineLearningRepository } from '../smart-info';
import { IStorageRepository, StorageCore, StorageFolder } from '../storage';
import { AssetFaceId, IFaceRepository } from './face.repository';

export class FacialRecognitionService {
  private logger = new Logger(FacialRecognitionService.name);
  private storageCore = new StorageCore();

  constructor(
    @Inject(IAssetRepository) private assetRepository: IAssetRepository,
    @Inject(IFaceRepository) private faceRepository: IFaceRepository,
    @Inject(IJobRepository) private jobRepository: IJobRepository,
    @Inject(IMachineLearningRepository) private machineLearning: IMachineLearningRepository,
    @Inject(IMediaRepository) private mediaRepository: IMediaRepository,
    @Inject(IPersonRepository) private personRepository: IPersonRepository,
    @Inject(ISearchRepository) private searchRepository: ISearchRepository,
    @Inject(IStorageRepository) private storageRepository: IStorageRepository,
  ) {}

  async handleQueueRecognizeFaces({ force }: IBaseJob) {
    const assetPagination = usePagination(JOBS_ASSET_PAGINATION_SIZE, (pagination) => {
      return force
        ? this.assetRepository.getAll(pagination)
        : this.assetRepository.getWithout(pagination, WithoutProperty.FACES);
    });

    if (force) {
      const people = await this.personRepository.deleteAll();
      const faces = await this.searchRepository.deleteAllFaces();
      this.logger.debug(`Deleted ${people} people and ${faces} faces`);
    }

    for await (const assets of assetPagination) {
      const pageIDs = assets.filter((asset) => asset.resizePath).map((asset) => asset.id);

      for (const ids of batched(pageIDs, MACHINE_LEARNING_BATCH_SIZE)) {
        await this.jobRepository.queue({ name: JobName.RECOGNIZE_FACES, data: { ids } });
      }
    }

    return true;
  }

  async handleRecognizeFaces({ ids }: IBulkEntityJob) {
    if (!MACHINE_LEARNING_ENABLED || !ids) {
      return false;
    }

    const assets = await this.assetRepository.getByIds(ids);
    const imagePaths = assets
      .map((asset) => asset.resizePath)
      .filter(notNull)
      .filter((resizePath) => resizePath.length > 0);

    if (imagePaths.length === 0) {
      return false;
    }
    const batchFaces = await this.machineLearning.detectFaces({ imagePaths });
    for (let i = 0; i < batchFaces.length; i++) {
      const asset = assets[i];
      const imageFaces = batchFaces[i];

      this.logger.debug(`${imageFaces.faces.length} faces detected in ${asset.resizePath}`);
      this.logger.verbose(imageFaces.faces.map((face) => ({ ...face, embedding: `float[${face.embedding.length}]` })));

      for (const face of imageFaces.faces) {
        const faceSearchResult = await this.searchRepository.searchFaces(face['embedding'], { ownerId: asset.ownerId });

        let personId: string | null = null;

        // try to find a matching face and link to the associated person
        // The closer to 0, the better the match. Range is from 0 to 2
        if (faceSearchResult.total && faceSearchResult.distances[0] < 0.6) {
          this.logger.verbose(`Match face with distance ${faceSearchResult.distances[0]}`);
          personId = faceSearchResult.items[0].personId;
        }

        if (!personId) {
          this.logger.debug('No matches, creating a new person.');
          const person = await this.personRepository.create({ ownerId: asset.ownerId });
          personId = person.id;
          await this.jobRepository.queue({
            name: JobName.GENERATE_FACE_THUMBNAIL,
            data: {
              assetId: asset.id,
              personId,
              imageHeight: imageFaces.imageHeight,
              imageWidth: imageFaces.imageWidth,
              boundingBox: face.boundingBox,
            },
          });
        }

        const faceId: AssetFaceId = { assetId: asset.id, personId };

        await this.faceRepository.create({ ...faceId, embedding: face.embedding });
        await this.jobRepository.queue({ name: JobName.SEARCH_INDEX_FACE, data: faceId });
      }
    }

    return true;
  }

  async handleGenerateFaceThumbnail(data: IFaceThumbnailJob) {
    const { assetId, personId, boundingBox, imageWidth, imageHeight } = data;

    const [asset] = await this.assetRepository.getByIds([assetId]);
    if (!asset || !asset.resizePath) {
      return false;
    }

    this.logger.verbose(`Cropping face for person: ${personId}`);

    const outputFolder = this.storageCore.getFolderLocation(StorageFolder.THUMBNAILS, asset.ownerId);
    const output = join(outputFolder, `${personId}.jpeg`);
    this.storageRepository.mkdirSync(outputFolder);

    const { x1, y1, x2, y2 } = boundingBox;

    const halfWidth = (x2 - x1) / 2;
    const halfHeight = (y2 - y1) / 2;

    const middleX = Math.round(x1 + halfWidth);
    const middleY = Math.round(y1 + halfHeight);

    // zoom out 10%
    const targetHalfSize = Math.floor(Math.max(halfWidth, halfHeight) * 1.1);

    // get the longest distance from the center of the image without overflowing
    const newHalfSize = Math.min(
      middleX - Math.max(0, middleX - targetHalfSize),
      middleY - Math.max(0, middleY - targetHalfSize),
      Math.min(imageWidth - 1, middleX + targetHalfSize) - middleX,
      Math.min(imageHeight - 1, middleY + targetHalfSize) - middleY,
    );

    const cropOptions: CropOptions = {
      left: middleX - newHalfSize,
      top: middleY - newHalfSize,
      width: newHalfSize * 2,
      height: newHalfSize * 2,
    };

    const croppedOutput = await this.mediaRepository.crop(asset.resizePath, cropOptions);
    await this.mediaRepository.resize(croppedOutput, output, { size: FACE_THUMBNAIL_SIZE, format: 'jpeg' });
    await this.personRepository.update({ id: personId, thumbnailPath: output });

    return true;
  }
}
