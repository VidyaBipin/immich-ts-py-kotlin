import { SystemConfig } from '@app/infra';
import { ValidateNested } from 'class-validator';
import { SystemConfigFFmpegDto } from './system-config-ffmpeg.dto';
import { SystemConfigOAuthDto } from './system-config-oauth.dto';
import { SystemConfigPasswordLoginDto } from './system-config-password-login.dto';
import { SystemConfigRecycleBinDto } from './system-config-recycle-bin.dto';
import { SystemConfigStorageTemplateDto } from './system-config-storage-template.dto';

export class SystemConfigDto {
  @ValidateNested()
  ffmpeg!: SystemConfigFFmpegDto;

  @ValidateNested()
  oauth!: SystemConfigOAuthDto;

  @ValidateNested()
  passwordLogin!: SystemConfigPasswordLoginDto;

  @ValidateNested()
  storageTemplate!: SystemConfigStorageTemplateDto;

  @ValidateNested()
  recycleBin!: SystemConfigRecycleBinDto;
}

export function mapConfig(config: SystemConfig): SystemConfigDto {
  return config;
}
