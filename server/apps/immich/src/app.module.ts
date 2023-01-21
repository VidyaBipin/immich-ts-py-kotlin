import { immichAppConfig, immichBullAsyncConfig } from '@app/common/config';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AssetModule } from './api-v1/asset/asset.module';
import { AuthModule } from './api-v1/auth/auth.module';
import { ImmichJwtModule } from './modules/immich-jwt/immich-jwt.module';
import { DeviceInfoModule } from './api-v1/device-info/device-info.module';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { ServerInfoModule } from './api-v1/server-info/server-info.module';
import { BackgroundTaskModule } from './modules/background-task/background-task.module';
import { CommunicationModule } from './api-v1/communication/communication.module';
import { AlbumModule } from './api-v1/album/album.module';
import { AppController } from './app.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { ScheduleTasksModule } from './modules/schedule-tasks/schedule-tasks.module';
import { JobModule } from './api-v1/job/job.module';
import { SystemConfigModule } from './api-v1/system-config/system-config.module';
import { OAuthModule } from './api-v1/oauth/oauth.module';
import { TagModule } from './api-v1/tag/tag.module';
import { ImmichConfigModule } from '@app/immich-config';
import { ShareModule } from './api-v1/share/share.module';
import { DomainModule } from '@app/domain';
import { InfraModule } from '@app/infra';
import { APIKeyController, UserController } from './controllers';
import { RecycleBinModule } from './api-v1/recycle-bin/recycle-bin.module';

@Module({
  imports: [
    ConfigModule.forRoot(immichAppConfig),

    DomainModule.register({
      imports: [InfraModule],
    }),

    AssetModule,

    AuthModule,
    OAuthModule,

    ImmichJwtModule,
    ImmichConfigModule,

    DeviceInfoModule,

    BullModule.forRootAsync(immichBullAsyncConfig),

    ServerInfoModule,

    BackgroundTaskModule,

    CommunicationModule,

    AlbumModule,

    RecycleBinModule,

    ScheduleModule.forRoot(),

    ScheduleTasksModule,

    JobModule,

    SystemConfigModule,

    TagModule,

    ShareModule,
  ],
  controllers: [
    //
    AppController,
    APIKeyController,
    UserController,
  ],
  providers: [],
})
export class AppModule implements NestModule {
  // TODO: check if consumer is needed or remove
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  configure(consumer: MiddlewareConsumer): void {
    if (process.env.NODE_ENV == 'development') {
      // consumer.apply(AppLoggerMiddleware).forRoutes('*');
    }
  }
}
