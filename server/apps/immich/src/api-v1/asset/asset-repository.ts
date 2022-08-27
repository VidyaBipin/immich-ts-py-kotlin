import { SearchPropertiesDto } from './dto/search-properties.dto';
import { CuratedLocationsResponseDto } from './response-dto/curated-locations-response.dto';
import { AssetEntity, AssetType } from '@app/database/entities/asset.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CreateAssetDto } from './dto/create-asset.dto';
import { CuratedObjectsResponseDto } from './response-dto/curated-objects-response.dto';
import { AssetCountByTimeGroupDto } from './response-dto/asset-count-by-time-group-response.dto';
import { TimeGroupEnum } from './dto/get-asset-count-by-time-group.dto';

export interface IAssetRepository {
  create(createAssetDto: CreateAssetDto, ownerId: string, originalPath: string, mimeType: string): Promise<AssetEntity>;
  getAllByUserId(userId: string): Promise<AssetEntity[]>;
  getAllByDeviceId(userId: string, deviceId: string): Promise<string[]>;
  getById(assetId: string): Promise<AssetEntity>;
  getLocationsByUserId(userId: string): Promise<CuratedLocationsResponseDto[]>;
  getDetectedObjectsByUserId(userId: string): Promise<CuratedObjectsResponseDto[]>;
  getSearchPropertiesByUserId(userId: string): Promise<SearchPropertiesDto[]>;
  getAssetCountByTimeGroup(userId: string, timeGroup: TimeGroupEnum): Promise<AssetCountByTimeGroupDto[]>;
}

export const ASSET_REPOSITORY = 'ASSET_REPOSITORY';

@Injectable()
export class AssetRepository implements IAssetRepository {
  constructor(
    @InjectRepository(AssetEntity)
    private assetRepository: Repository<AssetEntity>,
  ) {}
  async getAssetCountByTimeGroup(userId: string, timeGroup: TimeGroupEnum) {
    let result: AssetCountByTimeGroupDto[] = [];

    if (timeGroup === TimeGroupEnum.Month) {
      result = await this.assetRepository
        .createQueryBuilder('asset')
        .select(`COUNT(asset.id)::int`, 'count')
        .addSelect(`to_char(date_trunc('month', "createdAt"::timestamptz), 'YYYY_MM')`, 'timeGroup')
        .where('"userId" = :userId', { userId: userId })
        .groupBy(`date_trunc('month', "createdAt"::timestamptz)`)
        .orderBy(`date_trunc('month', "createdAt"::timestamptz)`, 'DESC')
        .getRawMany();
    } else if (timeGroup === TimeGroupEnum.Day) {
      result = await this.assetRepository
        .createQueryBuilder('asset')
        .select(`COUNT(asset.id)::int`, 'count')
        .addSelect(`to_char(date_trunc('day', "createdAt"::timestamptz), 'YYYY_MM_DD')`, 'timeGroup')
        .where('"userId" = :userId', { userId: userId })
        .groupBy(`date_trunc('day', "createdAt"::timestamptz)`)
        .orderBy(`date_trunc('day', "createdAt"::timestamptz)`, 'DESC')
        .getRawMany();
    }

    return result;
  }

  async getSearchPropertiesByUserId(userId: string): Promise<SearchPropertiesDto[]> {
    return await this.assetRepository
      .createQueryBuilder('asset')
      .where('asset.userId = :userId', { userId: userId })
      .leftJoin('asset.exifInfo', 'ei')
      .leftJoin('asset.smartInfo', 'si')
      .select('si.tags', 'tags')
      .addSelect('si.objects', 'objects')
      .addSelect('asset.type', 'assetType')
      .addSelect('ei.orientation', 'orientation')
      .addSelect('ei."lensModel"', 'lensModel')
      .addSelect('ei.make', 'make')
      .addSelect('ei.model', 'model')
      .addSelect('ei.city', 'city')
      .addSelect('ei.state', 'state')
      .addSelect('ei.country', 'country')
      .distinctOn(['si.tags'])
      .getRawMany();
  }

  async getDetectedObjectsByUserId(userId: string): Promise<CuratedObjectsResponseDto[]> {
    return await this.assetRepository.query(
      `
        SELECT DISTINCT ON (unnest(si.objects)) a.id, unnest(si.objects) as "object", a."resizePath", a."deviceAssetId", a."deviceId"
        FROM assets a
        LEFT JOIN smart_info si ON a.id = si."assetId"
        WHERE a."userId" = $1
        AND si.objects IS NOT NULL
      `,
      [userId],
    );
  }

  async getLocationsByUserId(userId: string): Promise<CuratedLocationsResponseDto[]> {
    return await this.assetRepository.query(
      `
        SELECT DISTINCT ON (e.city) a.id, e.city, a."resizePath", a."deviceAssetId", a."deviceId"
        FROM assets a
        LEFT JOIN exif e ON a.id = e."assetId"
        WHERE a."userId" = $1
        AND e.city IS NOT NULL
        AND a.type = 'IMAGE';
      `,
      [userId],
    );
  }

  /**
   * Get a single asset information by its ID
   * - include exif info
   * @param assetId
   */
  async getById(assetId: string): Promise<AssetEntity> {
    return await this.assetRepository.findOneOrFail({
      where: {
        id: assetId,
      },
      relations: ['exifInfo'],
    });
  }

  /**
   * Get all assets belong to the user on the database
   * @param userId
   */
  async getAllByUserId(userId: string): Promise<AssetEntity[]> {
    const query = this.assetRepository
      .createQueryBuilder('asset')
      .where('asset.userId = :userId', { userId: userId })
      .andWhere('asset.resizePath is not NULL')
      .leftJoinAndSelect('asset.exifInfo', 'exifInfo')
      .orderBy('asset.createdAt', 'DESC');

    return await query.getMany();
  }

  /**
   * Create new asset information in database
   * @param createAssetDto
   * @param ownerId
   * @param originalPath
   * @param mimeType
   * @returns Promise<AssetEntity>
   */
  async create(
    createAssetDto: CreateAssetDto,
    ownerId: string,
    originalPath: string,
    mimeType: string,
  ): Promise<AssetEntity> {
    const asset = new AssetEntity();
    asset.deviceAssetId = createAssetDto.deviceAssetId;
    asset.userId = ownerId;
    asset.deviceId = createAssetDto.deviceId;
    asset.type = createAssetDto.assetType || AssetType.OTHER;
    asset.originalPath = originalPath;
    asset.createdAt = createAssetDto.createdAt;
    asset.modifiedAt = createAssetDto.modifiedAt;
    asset.isFavorite = createAssetDto.isFavorite;
    asset.mimeType = mimeType;
    asset.duration = createAssetDto.duration || null;

    const createdAsset = await this.assetRepository.save(asset);

    if (!createdAsset) {
      throw new BadRequestException('Asset not created');
    }
    return createdAsset;
  }

  /**
   * Get assets by device's Id on the database
   * @param userId
   * @param deviceId
   *
   * @returns Promise<string[]> - Array of assetIds belong to the device
   */
  async getAllByDeviceId(userId: string, deviceId: string): Promise<string[]> {
    const rows = await this.assetRepository.find({
      where: {
        userId: userId,
        deviceId: deviceId,
      },
      select: ['deviceAssetId'],
    });
    const res: string[] = [];
    rows.forEach((v) => res.push(v.deviceAssetId));

    return res;
  }
}
