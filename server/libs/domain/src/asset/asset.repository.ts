import { AssetEntity, AssetType } from '@app/infra/db/entities';

export const IAssetRepository = 'IAssetRepository';

export interface IAssetRepository {
  deleteAll(ownerId: string): Promise<void>;
  getAll(): Promise<AssetEntity[]>;
  save(asset: Partial<AssetEntity>): Promise<AssetEntity>;
  findLivePhotoMatch(livePhotoCID: string, type: AssetType, otherAssetId: string): Promise<AssetEntity | null>;
}
