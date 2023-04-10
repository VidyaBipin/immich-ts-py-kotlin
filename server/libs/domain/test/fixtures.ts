import {
  AlbumEntity,
  APIKeyEntity,
  AssetEntity,
  AssetType,
  SharedLinkEntity,
  SharedLinkType,
  SystemConfig,
  TranscodePreset,
  UserEntity,
  UserTokenEntity,
} from '@app/infra/entities';
import {
  AlbumResponseDto,
  AssetResponseDto,
  AudioStreamInfo,
  AuthUserDto,
  ExifResponseDto,
  mapUser,
  SearchResult,
  SharedLinkResponseDto,
  VideoFormat,
  VideoInfo,
  VideoStreamInfo,
} from '../src';

const today = new Date();
const tomorrow = new Date();
const yesterday = new Date();
tomorrow.setDate(today.getDate() + 1);
yesterday.setDate(yesterday.getDate() - 1);

export const authStub = {
  admin: Object.freeze<AuthUserDto>({
    id: 'admin_id',
    email: 'admin@test.com',
    isAdmin: true,
    isPublicUser: false,
    isAllowUpload: true,
  }),
  user1: Object.freeze<AuthUserDto>({
    id: 'immich_id',
    email: 'immich@test.com',
    isAdmin: false,
    isPublicUser: false,
    isAllowUpload: true,
    isAllowDownload: true,
    isShowExif: true,
    accessTokenId: 'token-id',
  }),
  adminSharedLink: Object.freeze<AuthUserDto>({
    id: 'admin_id',
    email: 'admin@test.com',
    isAdmin: true,
    isAllowUpload: true,
    isAllowDownload: true,
    isPublicUser: true,
    isShowExif: true,
    sharedLinkId: '123',
  }),
  readonlySharedLink: Object.freeze<AuthUserDto>({
    id: 'admin_id',
    email: 'admin@test.com',
    isAdmin: true,
    isAllowUpload: false,
    isAllowDownload: false,
    isPublicUser: true,
    isShowExif: true,
    sharedLinkId: '123',
    accessTokenId: 'token-id',
  }),
};

export const userEntityStub = {
  admin: Object.freeze<UserEntity>({
    ...authStub.admin,
    password: 'admin_password',
    firstName: 'admin_first_name',
    lastName: 'admin_last_name',
    oauthId: '',
    shouldChangePassword: false,
    profileImagePath: '',
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
    tags: [],
    assets: [],
  }),
  user1: Object.freeze<UserEntity>({
    ...authStub.user1,
    password: 'immich_password',
    firstName: 'immich_first_name',
    lastName: 'immich_last_name',
    oauthId: '',
    shouldChangePassword: false,
    profileImagePath: '',
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
    tags: [],
    assets: [],
  }),
};

export const fileStub = {
  livePhotoStill: Object.freeze({
    originalPath: 'fake_path/asset_1.jpeg',
    mimeType: 'image/jpg',
    checksum: Buffer.from('file hash', 'utf8'),
    originalName: 'asset_1.jpeg',
  }),
  livePhotoMotion: Object.freeze({
    originalPath: 'fake_path/asset_1.mp4',
    mimeType: 'image/jpeg',
    checksum: Buffer.from('live photo file hash', 'utf8'),
    originalName: 'asset_1.mp4',
  }),
};

export const assetEntityStub = {
  noResizePath: Object.freeze<AssetEntity>({
    id: 'asset-id',
    originalFileName: 'asset_1.jpeg',
    deviceAssetId: 'device-asset-id',
    fileModifiedAt: '2023-02-23T05:06:29.716Z',
    fileCreatedAt: '2023-02-23T05:06:29.716Z',
    owner: userEntityStub.user1,
    ownerId: 'user-id',
    deviceId: 'device-id',
    originalPath: 'upload/upload/path.ext',
    resizePath: null,
    type: AssetType.IMAGE,
    webpPath: null,
    encodedVideoPath: null,
    createdAt: '2023-02-23T05:06:29.716Z',
    updatedAt: '2023-02-23T05:06:29.716Z',
    mimeType: null,
    isFavorite: true,
    duration: null,
    isVisible: true,
    livePhotoVideo: null,
    livePhotoVideoId: null,
    tags: [],
    sharedLinks: [],
  }),
  image: Object.freeze<AssetEntity>({
    id: 'asset-id',
    deviceAssetId: 'device-asset-id',
    fileModifiedAt: '2023-02-23T05:06:29.716Z',
    fileCreatedAt: '2023-02-23T05:06:29.716Z',
    owner: userEntityStub.user1,
    ownerId: 'user-id',
    deviceId: 'device-id',
    originalPath: '/original/path.ext',
    resizePath: '/uploads/user-id/thumbs/path.ext',
    type: AssetType.IMAGE,
    webpPath: null,
    encodedVideoPath: null,
    createdAt: '2023-02-23T05:06:29.716Z',
    updatedAt: '2023-02-23T05:06:29.716Z',
    mimeType: null,
    isFavorite: true,
    duration: null,
    isVisible: true,
    livePhotoVideo: null,
    livePhotoVideoId: null,
    tags: [],
    sharedLinks: [],
    originalFileName: 'image.jpeg',
  }),
  video: Object.freeze<AssetEntity>({
    id: 'asset-id',
    originalFileName: 'image.jpeg',
    deviceAssetId: 'device-asset-id',
    fileModifiedAt: '2023-02-23T05:06:29.716Z',
    fileCreatedAt: '2023-02-23T05:06:29.716Z',
    owner: userEntityStub.user1,
    ownerId: 'user-id',
    deviceId: 'device-id',
    originalPath: '/original/path.ext',
    resizePath: '/uploads/user-id/thumbs/path.ext',
    type: AssetType.VIDEO,
    webpPath: null,
    encodedVideoPath: null,
    createdAt: '2023-02-23T05:06:29.716Z',
    updatedAt: '2023-02-23T05:06:29.716Z',
    mimeType: null,
    isFavorite: true,
    duration: null,
    isVisible: true,
    livePhotoVideo: null,
    livePhotoVideoId: null,
    tags: [],
    sharedLinks: [],
  }),
  livePhotoMotionAsset: Object.freeze({
    id: 'live-photo-motion-asset',
    originalPath: fileStub.livePhotoMotion.originalPath,
    ownerId: authStub.user1.id,
    type: AssetType.VIDEO,
    isVisible: false,
    fileModifiedAt: '2022-06-19T23:41:36.910Z',
    fileCreatedAt: '2022-06-19T23:41:36.910Z',
  } as AssetEntity),

  livePhotoStillAsset: Object.freeze({
    id: 'live-photo-still-asset',
    originalPath: fileStub.livePhotoStill.originalPath,
    ownerId: authStub.user1.id,
    type: AssetType.IMAGE,
    livePhotoVideoId: 'live-photo-motion-asset',
    isVisible: true,
    fileModifiedAt: '2022-06-19T23:41:36.910Z',
    fileCreatedAt: '2022-06-19T23:41:36.910Z',
  } as AssetEntity),
};

export const albumStub = {
  empty: Object.freeze<AlbumEntity>({
    id: 'album-1',
    albumName: 'Empty album',
    ownerId: authStub.admin.id,
    owner: userEntityStub.admin,
    assets: [],
    albumThumbnailAsset: null,
    albumThumbnailAssetId: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    sharedLinks: [],
    sharedUsers: [],
  }),
  sharedWithUser: Object.freeze<AlbumEntity>({
    id: 'album-2',
    albumName: 'Empty album shared with user',
    ownerId: authStub.admin.id,
    owner: userEntityStub.admin,
    assets: [],
    albumThumbnailAsset: null,
    albumThumbnailAssetId: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    sharedLinks: [],
    sharedUsers: [userEntityStub.user1],
  }),
  sharedWithAdmin: Object.freeze<AlbumEntity>({
    id: 'album-3',
    albumName: 'Empty album shared with admin',
    ownerId: authStub.user1.id,
    owner: userEntityStub.user1,
    assets: [],
    albumThumbnailAsset: null,
    albumThumbnailAssetId: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    sharedLinks: [],
    sharedUsers: [userEntityStub.admin],
  }),
  oneAsset: Object.freeze<AlbumEntity>({
    id: 'album-4',
    albumName: 'Album with one asset',
    ownerId: authStub.admin.id,
    owner: userEntityStub.admin,
    assets: [assetEntityStub.image],
    albumThumbnailAsset: null,
    albumThumbnailAssetId: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    sharedLinks: [],
    sharedUsers: [],
  }),
  emptyWithInvalidThumbnail: Object.freeze<AlbumEntity>({
    id: 'album-5',
    albumName: 'Empty album with invalid thumbnail',
    ownerId: authStub.admin.id,
    owner: userEntityStub.admin,
    assets: [],
    albumThumbnailAsset: assetEntityStub.image,
    albumThumbnailAssetId: assetEntityStub.image.id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    sharedLinks: [],
    sharedUsers: [],
  }),
  emptyWithValidThumbnail: Object.freeze<AlbumEntity>({
    id: 'album-5',
    albumName: 'Empty album with invalid thumbnail',
    ownerId: authStub.admin.id,
    owner: userEntityStub.admin,
    assets: [],
    albumThumbnailAsset: null,
    albumThumbnailAssetId: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    sharedLinks: [],
    sharedUsers: [],
  }),
  oneAssetInvalidThumbnail: Object.freeze<AlbumEntity>({
    id: 'album-6',
    albumName: 'Album with one asset and invalid thumbnail',
    ownerId: authStub.admin.id,
    owner: userEntityStub.admin,
    assets: [assetEntityStub.image],
    albumThumbnailAsset: assetEntityStub.livePhotoMotionAsset,
    albumThumbnailAssetId: assetEntityStub.livePhotoMotionAsset.id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    sharedLinks: [],
    sharedUsers: [],
  }),
  oneAssetValidThumbnail: Object.freeze<AlbumEntity>({
    id: 'album-6',
    albumName: 'Album with one asset and invalid thumbnail',
    ownerId: authStub.admin.id,
    owner: userEntityStub.admin,
    assets: [assetEntityStub.image],
    albumThumbnailAsset: assetEntityStub.image,
    albumThumbnailAssetId: assetEntityStub.image.id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    sharedLinks: [],
    sharedUsers: [],
  }),
};

const assetInfo: ExifResponseDto = {
  make: 'camera-make',
  model: 'camera-model',
  exifImageWidth: 500,
  exifImageHeight: 500,
  fileSizeInByte: 100,
  orientation: 'orientation',
  dateTimeOriginal: today,
  modifyDate: today,
  timeZone: 'America/Los_Angeles',
  lensModel: 'fancy',
  fNumber: 100,
  focalLength: 100,
  iso: 100,
  exposureTime: '1/16',
  latitude: 100,
  longitude: 100,
  city: 'city',
  state: 'state',
  country: 'country',
};

const assetResponse: AssetResponseDto = {
  id: 'id_1',
  deviceAssetId: 'device_asset_id_1',
  ownerId: 'user_id_1',
  deviceId: 'device_id_1',
  type: AssetType.VIDEO,
  originalPath: 'fake_path/jpeg',
  originalFileName: 'original_file_name',
  resizePath: '',
  fileModifiedAt: today.toISOString(),
  fileCreatedAt: today.toISOString(),
  updatedAt: today.toISOString(),
  isFavorite: false,
  mimeType: 'image/jpeg',
  smartInfo: {
    tags: [],
    objects: ['a', 'b', 'c'],
  },
  webpPath: '',
  encodedVideoPath: '',
  duration: '0:00:00.00000',
  exifInfo: assetInfo,
  livePhotoVideoId: null,
  tags: [],
};

const albumResponse: AlbumResponseDto = {
  albumName: 'Test Album',
  albumThumbnailAssetId: null,
  createdAt: today.toISOString(),
  updatedAt: today.toISOString(),
  id: 'album-123',
  ownerId: 'admin_id',
  owner: mapUser(userEntityStub.admin),
  sharedUsers: [],
  shared: false,
  assets: [],
  assetCount: 1,
};

export const userTokenEntityStub = {
  userToken: Object.freeze<UserTokenEntity>({
    id: 'token-id',
    token: 'auth_token',
    user: userEntityStub.user1,
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
  }),
};

export const keyStub = {
  admin: Object.freeze({
    id: 'my-random-guid',
    name: 'My Key',
    key: 'my-api-key (hashed)',
    userId: authStub.admin.id,
    user: userEntityStub.admin,
  } as APIKeyEntity),
};

export const systemConfigStub = {
  defaults: Object.freeze({
    ffmpeg: {
      crf: '23',
      preset: 'ultrafast',
      targetAudioCodec: 'aac',
      targetResolution: '720',
      targetVideoCodec: 'h264',
      transcode: TranscodePreset.REQUIRED,
    },
    oauth: {
      autoLaunch: false,
      autoRegister: true,
      buttonText: 'Login with OAuth',
      clientId: '',
      clientSecret: '',
      enabled: false,
      issuerUrl: '',
      mobileOverrideEnabled: false,
      mobileRedirectUri: '',
      scope: 'openid email profile',
    },
    passwordLogin: {
      enabled: true,
    },
    storageTemplate: {
      template: '{{y}}/{{y}}-{{MM}}-{{dd}}/{{filename}}',
    },
  } as SystemConfig),
  enabled: Object.freeze({
    passwordLogin: {
      enabled: true,
    },
    oauth: {
      enabled: true,
      autoRegister: true,
      buttonText: 'OAuth',
      autoLaunch: false,
    },
  } as SystemConfig),
  disabled: Object.freeze({
    passwordLogin: {
      enabled: false,
    },
    oauth: {
      enabled: false,
      buttonText: 'OAuth',
      issuerUrl: 'http://issuer,',
      autoLaunch: false,
    },
  } as SystemConfig),
  noAutoRegister: {
    oauth: {
      enabled: true,
      autoRegister: false,
      autoLaunch: false,
    },
    passwordLogin: { enabled: true },
  } as SystemConfig,
  override: {
    oauth: {
      enabled: true,
      autoRegister: true,
      autoLaunch: false,
      buttonText: 'OAuth',
      mobileOverrideEnabled: true,
      mobileRedirectUri: 'http://mobile-redirect',
    },
    passwordLogin: { enabled: true },
  } as SystemConfig,
};

export const loginResponseStub = {
  user1oauth: {
    response: {
      accessToken: 'cmFuZG9tLWJ5dGVz',
      userId: 'immich_id',
      userEmail: 'immich@test.com',
      firstName: 'immich_first_name',
      lastName: 'immich_last_name',
      profileImagePath: '',
      isAdmin: false,
      shouldChangePassword: false,
    },
    cookie: [
      'immich_access_token=cmFuZG9tLWJ5dGVz; HttpOnly; Secure; Path=/; Max-Age=34560000; SameSite=Lax;',
      'immich_auth_type=oauth; HttpOnly; Secure; Path=/; Max-Age=34560000; SameSite=Lax;',
    ],
  },
  user1password: {
    response: {
      accessToken: 'cmFuZG9tLWJ5dGVz',
      userId: 'immich_id',
      userEmail: 'immich@test.com',
      firstName: 'immich_first_name',
      lastName: 'immich_last_name',
      profileImagePath: '',
      isAdmin: false,
      shouldChangePassword: false,
    },
    cookie: [
      'immich_access_token=cmFuZG9tLWJ5dGVz; HttpOnly; Secure; Path=/; Max-Age=34560000; SameSite=Lax;',
      'immich_auth_type=password; HttpOnly; Secure; Path=/; Max-Age=34560000; SameSite=Lax;',
    ],
  },
  user1insecure: {
    response: {
      accessToken: 'cmFuZG9tLWJ5dGVz',
      userId: 'immich_id',
      userEmail: 'immich@test.com',
      firstName: 'immich_first_name',
      lastName: 'immich_last_name',
      profileImagePath: '',
      isAdmin: false,
      shouldChangePassword: false,
    },
    cookie: [
      'immich_access_token=cmFuZG9tLWJ5dGVz; HttpOnly; Path=/; Max-Age=34560000; SameSite=Lax;',
      'immich_auth_type=password; HttpOnly; Path=/; Max-Age=34560000; SameSite=Lax;',
    ],
  },
};

export const sharedLinkStub = {
  valid: Object.freeze({
    id: '123',
    userId: authStub.admin.id,
    user: userEntityStub.admin,
    key: Buffer.from('secret-key', 'utf8'),
    type: SharedLinkType.ALBUM,
    createdAt: today.toISOString(),
    expiresAt: tomorrow.toISOString(),
    allowUpload: true,
    allowDownload: true,
    showExif: true,
    album: undefined,
    assets: [],
  } as SharedLinkEntity),
  expired: Object.freeze({
    id: '123',
    userId: authStub.admin.id,
    user: userEntityStub.admin,
    key: Buffer.from('secret-key', 'utf8'),
    type: SharedLinkType.ALBUM,
    createdAt: today.toISOString(),
    expiresAt: yesterday.toISOString(),
    allowUpload: true,
    allowDownload: true,
    showExif: true,
    assets: [],
  } as SharedLinkEntity),
  readonly: Object.freeze<SharedLinkEntity>({
    id: '123',
    userId: authStub.admin.id,
    user: userEntityStub.admin,
    key: Buffer.from('secret-key', 'utf8'),
    type: SharedLinkType.ALBUM,
    createdAt: today.toISOString(),
    expiresAt: tomorrow.toISOString(),
    allowUpload: false,
    allowDownload: false,
    showExif: true,
    assets: [],
    album: {
      id: 'album-123',
      ownerId: authStub.admin.id,
      owner: userEntityStub.admin,
      albumName: 'Test Album',
      createdAt: today.toISOString(),
      updatedAt: today.toISOString(),
      albumThumbnailAsset: null,
      albumThumbnailAssetId: null,
      sharedUsers: [],
      sharedLinks: [],
      assets: [
        {
          id: 'id_1',
          owner: userEntityStub.user1,
          ownerId: 'user_id_1',
          deviceAssetId: 'device_asset_id_1',
          deviceId: 'device_id_1',
          type: AssetType.VIDEO,
          originalPath: 'fake_path/jpeg',
          resizePath: '',
          fileModifiedAt: today.toISOString(),
          fileCreatedAt: today.toISOString(),
          createdAt: today.toISOString(),
          updatedAt: today.toISOString(),
          isFavorite: false,
          mimeType: 'image/jpeg',
          smartInfo: {
            assetId: 'id_1',
            tags: [],
            objects: ['a', 'b', 'c'],
            asset: null as any,
            clipEmbedding: [0.12, 0.13, 0.14],
          },
          webpPath: '',
          encodedVideoPath: '',
          duration: null,
          isVisible: true,
          livePhotoVideo: null,
          livePhotoVideoId: null,
          originalFileName: 'asset_1.jpeg',
          exifInfo: {
            livePhotoCID: null,
            assetId: 'id_1',
            description: 'description',
            exifImageWidth: 500,
            exifImageHeight: 500,
            fileSizeInByte: 100,
            orientation: 'orientation',
            dateTimeOriginal: today,
            modifyDate: today,
            timeZone: 'America/Los_Angeles',
            latitude: 100,
            longitude: 100,
            city: 'city',
            state: 'state',
            country: 'country',
            make: 'camera-make',
            model: 'camera-model',
            lensModel: 'fancy',
            fNumber: 100,
            focalLength: 100,
            iso: 100,
            exposureTime: '1/16',
            fps: 100,
            asset: null as any,
            exifTextSearchableColumn: '',
          },
          tags: [],
          sharedLinks: [],
        },
      ],
    },
  }),
};

export const sharedLinkResponseStub = {
  valid: Object.freeze<SharedLinkResponseDto>({
    allowDownload: true,
    allowUpload: true,
    assets: [],
    createdAt: today.toISOString(),
    description: undefined,
    expiresAt: tomorrow.toISOString(),
    id: '123',
    key: '7365637265742d6b6579',
    showExif: true,
    type: SharedLinkType.ALBUM,
    userId: 'admin_id',
  }),
  expired: Object.freeze<SharedLinkResponseDto>({
    album: undefined,
    allowDownload: true,
    allowUpload: true,
    assets: [],
    createdAt: today.toISOString(),
    description: undefined,
    expiresAt: yesterday.toISOString(),
    id: '123',
    key: '7365637265742d6b6579',
    showExif: true,
    type: SharedLinkType.ALBUM,
    userId: 'admin_id',
  }),
  readonly: Object.freeze<SharedLinkResponseDto>({
    id: '123',
    userId: 'admin_id',
    key: '7365637265742d6b6579',
    type: SharedLinkType.ALBUM,
    createdAt: today.toISOString(),
    expiresAt: tomorrow.toISOString(),
    description: undefined,
    allowUpload: false,
    allowDownload: false,
    showExif: true,
    album: albumResponse,
    assets: [assetResponse],
  }),
  readonlyNoExif: Object.freeze<SharedLinkResponseDto>({
    id: '123',
    userId: 'admin_id',
    key: '7365637265742d6b6579',
    type: SharedLinkType.ALBUM,
    createdAt: today.toISOString(),
    expiresAt: tomorrow.toISOString(),
    description: undefined,
    allowUpload: false,
    allowDownload: false,
    showExif: true,
    album: albumResponse,
    assets: [{ ...assetResponse, exifInfo: undefined }],
  }),
};

// TODO - the constructor isn't used anywhere, so not test coverage
new ExifResponseDto();

export const searchStub = {
  emptyResults: Object.freeze<SearchResult<any>>({
    total: 0,
    count: 0,
    page: 1,
    items: [],
    facets: [],
  }),
};

const probeStubDefaultFormat: VideoFormat = {
  formatName: 'mov,mp4,m4a,3gp,3g2,mj2',
  formatLongName: 'QuickTime / MOV',
  duration: 0,
};

const probeStubDefaultVideoStream: VideoStreamInfo[] = [
  { height: 1080, width: 1920, codecName: 'h265', codecType: 'video', frameCount: 100, rotation: 0 },
];

const probeStubDefaultAudioStream: AudioStreamInfo[] = [{ codecName: 'aac', codecType: 'audio' }];

const probeStubDefault: VideoInfo = {
  format: probeStubDefaultFormat,
  videoStreams: probeStubDefaultVideoStream,
  audioStreams: probeStubDefaultAudioStream,
};

export const probeStub = {
  noVideoStreams: Object.freeze<VideoInfo>({ ...probeStubDefault, videoStreams: [] }),
  multipleVideoStreams: Object.freeze<VideoInfo>({
    ...probeStubDefault,
    videoStreams: [
      {
        height: 1080,
        width: 400,
        codecName: 'h265',
        codecType: 'video',
        frameCount: 100,
        rotation: 0,
      },
      {
        height: 1080,
        width: 400,
        codecName: 'h7000',
        codecType: 'video',
        frameCount: 99,
        rotation: 0,
      },
    ],
  }),
  noHeight: Object.freeze<VideoInfo>({
    ...probeStubDefault,
    videoStreams: [
      {
        height: 0,
        width: 400,
        codecName: 'h265',
        codecType: 'video',
        frameCount: 100,
        rotation: 0,
      },
    ],
  }),
  videoStream2160p: Object.freeze<VideoInfo>({
    ...probeStubDefault,
    videoStreams: [
      {
        height: 2160,
        width: 3840,
        codecName: 'h264',
        codecType: 'video',
        frameCount: 100,
        rotation: 0,
      },
    ],
  }),
  videoStreamVertical2160p: Object.freeze<VideoInfo>({
    ...probeStubDefault,
    videoStreams: [
      {
        height: 2160,
        width: 3840,
        codecName: 'h264',
        codecType: 'video',
        frameCount: 100,
        rotation: 90,
      },
    ],
  }),
  audioStreamMp3: Object.freeze<VideoInfo>({
    ...probeStubDefault,
    audioStreams: [{ codecType: 'audio', codecName: 'aac' }],
  }),
  matroskaContainer: Object.freeze<VideoInfo>({
    ...probeStubDefault,
    format: {
      formatName: 'matroska,webm',
      formatLongName: 'Matroska / WebM',
      duration: 0,
    },
  }),
};
