import { MACHINE_LEARNING_ENABLED } from '@app/common';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { IAssetJob } from '../job';
import { IMachineLearningRepository } from './machine-learning.interface';
import { ISmartInfoRepository } from './smart-info.repository';

@Injectable()
export class SmartInfoService {
  private logger = new Logger(SmartInfoService.name);

  constructor(
    @Inject(ISmartInfoRepository) private repository: ISmartInfoRepository,
    @Inject(IMachineLearningRepository) private machineLearning: IMachineLearningRepository,
  ) {}

  async handleTagImage(data: IAssetJob) {
    const { asset } = data;

    if (!MACHINE_LEARNING_ENABLED || !asset.resizePath) {
      return;
    }

    try {
      const tags = await this.machineLearning.tagImage({ thumbnailPath: asset.resizePath });

      if (tags.length > 0) {
        await this.repository.upsert({ assetId: asset.id, tags });
      }
    } catch (error: any) {
      this.logger.error(`Unable to tag image: ${asset.id}`, error?.stack);
    }
  }

  async handleDetectObjects(data: IAssetJob) {
    const { asset } = data;

    if (!MACHINE_LEARNING_ENABLED || !asset.resizePath) {
      return;
    }

    try {
      const tags = await this.machineLearning.tagImage({ thumbnailPath: asset.resizePath });

      if (tags.length > 0) {
        await this.repository.upsert({ assetId: asset.id, tags });
      }
    } catch (error: any) {
      this.logger.error(`Unable to detect objects: ${asset.id}`, error?.stack);
    }
  }
}
