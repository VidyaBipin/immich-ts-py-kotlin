import { APP_UPLOAD_LOCATION } from '@app/common/constants';
import { AssetEntity } from '@app/infra';
import { QueueName, JobName } from '@app/job';
import { IMp4ConversionProcessor } from '@app/job/interfaces/video-transcode.interface';
import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'bull';
import ffmpeg from 'fluent-ffmpeg';
import { existsSync, mkdirSync } from 'fs';
import { ImmichConfigService } from 'libs/immich-config/src';
import { Repository } from 'typeorm';
import { assetUtils } from '@app/common';

@Processor(QueueName.VIDEO_CONVERSION)
export class VideoTranscodeProcessor {
  constructor(
    @InjectRepository(AssetEntity)
    private assetRepository: Repository<AssetEntity>,
    private immichConfigService: ImmichConfigService,
  ) {}

  @Process({ name: JobName.MP4_CONVERSION, concurrency: 2 })
  async mp4Conversion(job: Job<IMp4ConversionProcessor>) {
    const { asset } = job.data;

    if (!assetUtils.isWebPlayable(asset.mimeType)) {
      const basePath = APP_UPLOAD_LOCATION;
      const encodedVideoPath = `${basePath}/${asset.userId}/encoded-video`;

      if (!existsSync(encodedVideoPath)) {
        mkdirSync(encodedVideoPath, { recursive: true });
      }

      const savedEncodedPath = encodedVideoPath + '/' + asset.id + '.mp4';

      if (asset.encodedVideoPath == '' || !asset.encodedVideoPath) {
        // Put the processing into its own async function to prevent the job exist right away
        await this.runFFMPEGPipeLine(asset, savedEncodedPath);
      }
    }
  }

  async runFFMPEGPipeLine(asset: AssetEntity, savedEncodedPath: string): Promise<void> {
    const config = await this.immichConfigService.getConfig();

    return new Promise((resolve, reject) => {
      ffmpeg(asset.originalPath)
        .outputOptions([
          `-crf ${config.ffmpeg.crf}`,
          `-preset ${config.ffmpeg.preset}`,
          `-vcodec ${config.ffmpeg.targetVideoCodec}`,
          `-acodec ${config.ffmpeg.targetAudioCodec}`,
          `-vf scale=${config.ffmpeg.targetScaling}`,
        ])
        .output(savedEncodedPath)
        .on('start', () => {
          Logger.log('Start Converting Video', 'mp4Conversion');
        })
        .on('error', (error) => {
          Logger.error(`Cannot Convert Video ${error}`, 'mp4Conversion');
          reject();
        })
        .on('end', async () => {
          Logger.log(`Converting Success ${asset.id}`, 'mp4Conversion');
          await this.assetRepository.update({ id: asset.id }, { encodedVideoPath: savedEncodedPath });
          resolve();
        })
        .run();
    });
  }
}
