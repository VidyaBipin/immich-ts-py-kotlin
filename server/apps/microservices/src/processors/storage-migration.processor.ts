import { APP_UPLOAD_LOCATION } from '@app/common';
import { AssetEntity } from '@app/database/entities/asset.entity';
import { ImmichConfigService } from '@app/immich-config';
import { QueueNameEnum, templateMigrationProcessorName, updateTemplateProcessorName } from '@app/job';
import { StorageService } from '@app/storage';
import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Processor(QueueNameEnum.STORAGE_MIGRATION)
export class StorageMigrationProcessor {
  readonly logger: Logger = new Logger(StorageMigrationProcessor.name);

  constructor(
    private storageService: StorageService,
    private immichConfigService: ImmichConfigService,

    @InjectRepository(AssetEntity)
    private assetRepository: Repository<AssetEntity>,
  ) {}

  /**
   * Migration process when a new user set a new storage template.
   * @param job
   */
  @Process({ name: templateMigrationProcessorName, concurrency: 100 })
  async templateMigration() {
    const assets = await this.assetRepository.find({
      relations: ['exifInfo'],
    });

    console.time('migrating-time');
    for (const asset of assets) {
      const filename = asset.exifInfo?.imageName || asset.id;
      await this.storageService.moveAsset(asset, filename);
    }

    await this.storageService.removeEmptyDirectories(APP_UPLOAD_LOCATION);
    console.timeEnd('migrating-time');
  }

  /**
   * Update config when a new storage template is set.
   * This is to ensure the synchronization between processes.
   * @param job
   */
  @Process({ name: updateTemplateProcessorName, concurrency: 1 })
  async updateTemplate() {
    await this.immichConfigService.refreshConfig();
  }
}
