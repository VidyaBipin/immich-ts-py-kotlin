import { AssetOrder } from '@app/domain/asset/dto/asset.dto';
import { AssetType } from '@app/infra/entities';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { Optional, QueryBoolean, QueryDate, ValidateUUID, toBoolean } from '../../domain.util';

export class AssetSearchDto {
  @ValidateUUID({ optional: true })
  id?: string;

  @ValidateUUID({ optional: true })
  libraryId?: string;

  @IsString()
  @IsNotEmpty()
  @Optional()
  deviceAssetId?: string;

  @IsString()
  @IsNotEmpty()
  @Optional()
  deviceId?: string;

  @IsEnum(AssetType)
  @Optional()
  @ApiProperty({ enumName: 'AssetTypeEnum', enum: AssetType })
  type?: AssetType;

  @IsString()
  @IsNotEmpty()
  @Optional()
  checksum?: string;

  @QueryBoolean({ optional: true })
  isArchived?: boolean;

  @QueryBoolean({ optional: true })
  isEncoded?: boolean;

  @QueryBoolean({ optional: true })
  isExternal?: boolean;

  @QueryBoolean({ optional: true })
  isFavorite?: boolean;

  @QueryBoolean({ optional: true })
  isMotion?: boolean;

  @QueryBoolean({ optional: true })
  isOffline?: boolean;

  @QueryBoolean({ optional: true })
  isReadOnly?: boolean;

  @QueryBoolean({ optional: true })
  isVisible?: boolean;

  @QueryBoolean({ optional: true })
  withDeleted?: boolean;

  @QueryBoolean({ optional: true })
  withStacked?: boolean;

  @QueryBoolean({ optional: true })
  withExif?: boolean;

  @QueryBoolean({ optional: true })
  withPeople?: boolean;

  @QueryDate({ optional: true })
  createdBefore?: Date;

  @QueryDate({ optional: true })
  createdAfter?: Date;

  @QueryDate({ optional: true })
  updatedBefore?: Date;

  @QueryDate({ optional: true })
  updatedAfter?: Date;

  @QueryDate({ optional: true })
  trashedBefore?: Date;

  @QueryDate({ optional: true })
  trashedAfter?: Date;

  @QueryDate({ optional: true })
  takenBefore?: Date;

  @QueryDate({ optional: true })
  takenAfter?: Date;

  @IsString()
  @IsNotEmpty()
  @Optional()
  originalFileName?: string;

  @IsString()
  @IsNotEmpty()
  @Optional()
  originalPath?: string;

  @IsString()
  @IsNotEmpty()
  @Optional()
  resizePath?: string;

  @IsString()
  @IsNotEmpty()
  @Optional()
  webpPath?: string;

  @IsString()
  @IsNotEmpty()
  @Optional()
  encodedVideoPath?: string;

  @IsString()
  @IsNotEmpty()
  @Optional()
  city?: string;

  @IsString()
  @IsNotEmpty()
  @Optional()
  state?: string;

  @IsString()
  @IsNotEmpty()
  @Optional()
  country?: string;

  @IsString()
  @IsNotEmpty()
  @Optional()
  make?: string;

  @IsString()
  @IsNotEmpty()
  @Optional()
  model?: string;

  @IsString()
  @IsNotEmpty()
  @Optional()
  lensModel?: string;

  @IsEnum(AssetOrder)
  @Optional()
  @ApiProperty({ enumName: 'AssetOrder', enum: AssetOrder })
  order?: AssetOrder;

  @IsInt()
  @Min(1)
  @Type(() => Number)
  @Optional()
  page?: number;

  @IsInt()
  @Min(1)
  @Type(() => Number)
  @Optional()
  size?: number;
}

export class SmartSearchDto {
  @IsString()
  @IsNotEmpty()
  query!: string;

  @ValidateUUID({ optional: true })
  libraryId?: string;

  @IsString()
  @Optional()
  deviceId?: string;

  @IsEnum(AssetType)
  @Optional()
  @ApiProperty({ enumName: 'AssetTypeEnum', enum: AssetType })
  type?: AssetType;

  @QueryBoolean({ optional: true })
  isArchived?: boolean;

  @QueryBoolean({ optional: true })
  withArchived?: boolean;

  @QueryBoolean({ optional: true })
  isEncoded?: boolean;

  @QueryBoolean({ optional: true })
  isExternal?: boolean;

  @QueryBoolean({ optional: true })
  isFavorite?: boolean;

  @QueryBoolean({ optional: true })
  isMotion?: boolean;

  @QueryBoolean({ optional: true })
  isOffline?: boolean;

  @QueryBoolean({ optional: true })
  isReadOnly?: boolean;

  @QueryBoolean({ optional: true })
  isVisible?: boolean;

  @QueryBoolean({ optional: true })
  withDeleted?: boolean;

  @QueryBoolean({ optional: true })
  withExif?: boolean;

  @QueryDate({ optional: true })
  createdBefore?: Date;

  @QueryDate({ optional: true })
  createdAfter?: Date;

  @QueryDate({ optional: true })
  updatedBefore?: Date;

  @QueryDate({ optional: true })
  updatedAfter?: Date;

  @QueryDate({ optional: true })
  trashedBefore?: Date;

  @QueryDate({ optional: true })
  trashedAfter?: Date;

  @QueryDate({ optional: true })
  takenBefore?: Date;

  @QueryDate({ optional: true })
  takenAfter?: Date;

  @IsString()
  @IsNotEmpty()
  @Optional()
  city?: string;

  @IsString()
  @IsNotEmpty()
  @Optional()
  state?: string;

  @IsString()
  @IsNotEmpty()
  @Optional()
  country?: string;

  @IsString()
  @IsNotEmpty()
  @Optional()
  make?: string;

  @IsString()
  @IsNotEmpty()
  @Optional()
  model?: string;

  @IsString()
  @IsNotEmpty()
  @Optional()
  lensModel?: string;

  @IsInt()
  @Min(1)
  @Type(() => Number)
  @Optional()
  page?: number;

  @IsInt()
  @Min(1)
  @Type(() => Number)
  @Optional()
  size?: number;
}

export class SearchPeopleDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsBoolean()
  @Transform(toBoolean)
  @Optional()
  withHidden?: boolean;
}
