import {
  AssetIdsDto,
  AssetResponseDto,
  AssetService,
  AssetStatsDto,
  AssetStatsResponseDto,
  AuthUserDto,
  DownloadDto,
  DownloadResponseDto,
  MapMarkerResponseDto,
  MemoryLaneDto,
  TimeBucketAssetDto,
  TimeBucketDto,
  TimeBucketResponseDto,
} from '@app/domain';
import { MapMarkerDto } from '@app/domain/asset/dto/map-marker.dto';
import { MemoryLaneResponseDto } from '@app/domain/asset/response-dto/memory-lane-response.dto';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, StreamableFile } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Authenticated, AuthUser, SharedLinkRoute } from '../app.guard';
import { asStreamableFile, UseValidation } from '../app.utils';
import { UUIDParamDto } from './dto/uuid-param.dto';

@ApiTags('Asset')
@Controller('asset')
@Authenticated()
@UseValidation()
export class AssetController {
  constructor(private service: AssetService) {}

  @Get('map-marker')
  getMapMarkers(@AuthUser() authUser: AuthUserDto, @Query() options: MapMarkerDto): Promise<MapMarkerResponseDto[]> {
    return this.service.getMapMarkers(authUser, options);
  }

  @Get('memory-lane')
  getMemoryLane(@AuthUser() authUser: AuthUserDto, @Query() dto: MemoryLaneDto): Promise<MemoryLaneResponseDto[]> {
    return this.service.getMemoryLane(authUser, dto);
  }

  @SharedLinkRoute()
  @Get('download')
  getDownloadInfo(@AuthUser() authUser: AuthUserDto, @Query() dto: DownloadDto): Promise<DownloadResponseDto> {
    return this.service.getDownloadInfo(authUser, dto);
  }

  @SharedLinkRoute()
  @Post('download')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ content: { 'application/octet-stream': { schema: { type: 'string', format: 'binary' } } } })
  downloadArchive(@AuthUser() authUser: AuthUserDto, @Body() dto: AssetIdsDto): Promise<StreamableFile> {
    return this.service.downloadArchive(authUser, dto).then(asStreamableFile);
  }

  @SharedLinkRoute()
  @Post('download/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ content: { 'application/octet-stream': { schema: { type: 'string', format: 'binary' } } } })
  downloadFile(@AuthUser() authUser: AuthUserDto, @Param() { id }: UUIDParamDto) {
    return this.service.downloadFile(authUser, id).then(asStreamableFile);
  }

  @Get('statistics')
  getAssetStats(@AuthUser() authUser: AuthUserDto, @Query() dto: AssetStatsDto): Promise<AssetStatsResponseDto> {
    return this.service.getStatistics(authUser, dto);
  }

  @Authenticated({ isShared: true })
  @Get('time-buckets')
  getTimeBuckets(@AuthUser() authUser: AuthUserDto, @Query() dto: TimeBucketDto): Promise<TimeBucketResponseDto[]> {
    return this.service.getTimeBuckets(authUser, dto);
  }

  @Authenticated({ isShared: true })
  @Get('time-bucket')
  getByTimeBucket(@AuthUser() authUser: AuthUserDto, @Query() dto: TimeBucketAssetDto): Promise<AssetResponseDto[]> {
    return this.service.getByTimeBucket(authUser, dto);
  }
}
