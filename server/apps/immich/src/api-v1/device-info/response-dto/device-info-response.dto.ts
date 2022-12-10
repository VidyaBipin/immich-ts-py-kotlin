import { DeviceInfo, DeviceType } from '@app/common';
import { ApiProperty } from '@nestjs/swagger';

export class DeviceInfoResponseDto {
  @ApiProperty({ type: 'integer' })
  id!: number;
  userId!: string;
  deviceId!: string;

  @ApiProperty({ enumName: 'DeviceTypeEnum', enum: DeviceType })
  deviceType!: DeviceType;

  createdAt!: string;
  isAutoBackup!: boolean;
}

export function mapDeviceInfoResponse(entity: DeviceInfo): DeviceInfoResponseDto {
  return {
    id: entity.id,
    userId: entity.userId,
    deviceId: entity.deviceId,
    deviceType: entity.deviceType,
    createdAt: entity.createdAt,
    isAutoBackup: entity.isAutoBackup,
  };
}
