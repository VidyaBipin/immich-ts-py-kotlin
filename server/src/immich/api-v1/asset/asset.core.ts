import { AuthUserDto, IJobRepository, JobName, UploadFile } from '@app/domain';
import { AssetEntity, LibraryEntity, UserEntity } from '@app/infra/entities';
import { parse } from 'node:path';
import { IAssetRepository } from './asset-repository';
import { CreateAssetDto, ImportAssetDto } from './dto/create-asset.dto';

export class AssetCore {
  constructor(private repository: IAssetRepository, private jobRepository: IJobRepository) {}

  async create(
    authUser: AuthUserDto,
    dto: CreateAssetDto | ImportAssetDto,
    file: UploadFile,
    livePhotoAssetId?: string,
    sidecarPath?: string,
  ): Promise<AssetEntity> {
    const asset = await this.repository.create({
      owner: { id: authUser.id } as UserEntity,
      library: { id: dto.libraryId } as LibraryEntity,

      mimeType: file.mimeType,
      checksum: file.checksum,
      originalPath: file.originalPath,

      deviceAssetId: dto.deviceAssetId,
      deviceId: dto.deviceId,

      fileCreatedAt: dto.fileCreatedAt,
      fileModifiedAt: dto.fileModifiedAt,

      type: dto.assetType,
      isFavorite: dto.isFavorite,
      isArchived: dto.isArchived ?? false,
      duration: dto.duration || null,
      isVisible: dto.isVisible ?? true,
      livePhotoVideo: livePhotoAssetId != null ? ({ id: livePhotoAssetId } as AssetEntity) : null,
      resizePath: null,
      webpPath: null,
      thumbhash: null,
      encodedVideoPath: null,
      tags: [],
      sharedLinks: [],
      originalFileName: parse(file.originalName).name,
      faces: [],
      sidecarPath: sidecarPath || null,
      isReadOnly: dto.isReadOnly ?? false,
      isOffline: dto.isOffline ?? false,
    });

    await this.jobRepository.queue({ name: JobName.METADATA_EXTRACTION, data: { id: asset.id, source: 'upload' } });

    return asset;
  }
}
