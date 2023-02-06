import {
  APIKeyEntity,
  AssetType,
  SharedLinkEntity,
  SharedLinkType,
  SystemConfig,
  UserEntity,
  UserTokenEntity,
} from '@app/infra/db/entities';
import { AlbumResponseDto, AssetResponseDto, AuthUserDto, ExifResponseDto, SharedLinkResponseDto } from '../src';

const today = new Date();
const tomorrow = new Date();
const yesterday = new Date();
tomorrow.setDate(today.getDate() + 1);
yesterday.setDate(yesterday.getDate() - 1);

const assetInfo: ExifResponseDto = {
  id: 1,
  make: 'camera-make',
  model: 'camera-model',
  imageName: 'fancy-image',
  exifImageWidth: 500,
  exifImageHeight: 500,
  fileSizeInByte: 100,
  orientation: 'orientation',
  dateTimeOriginal: today,
  modifyDate: today,
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
  resizePath: '',
  createdAt: today.toISOString(),
  modifiedAt: today.toISOString(),
  isFavorite: false,
  mimeType: 'image/jpeg',
  smartInfo: {
    id: 'should-be-a-number',
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
  id: 'album-123',
  ownerId: 'admin_id',
  sharedUsers: [],
  shared: false,
  assets: [],
  assetCount: 1,
};

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
    tags: [],
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
    tags: [],
  }),
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
    id: 1,
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
      targetScaling: '1280:-2',
      targetVideoCodec: 'h264',
      transcodeAll: false,
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
      'immich_access_token=cmFuZG9tLWJ5dGVz; HttpOnly; Secure; Path=/; Max-Age=604800; SameSite=Lax;',
      'immich_auth_type=oauth; HttpOnly; Secure; Path=/; Max-Age=604800; SameSite=Lax;',
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
      'immich_access_token=cmFuZG9tLWJ5dGVz; HttpOnly; Secure; Path=/; Max-Age=604800; SameSite=Lax;',
      'immich_auth_type=password; HttpOnly; Secure; Path=/; Max-Age=604800; SameSite=Lax;',
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
      'immich_access_token=cmFuZG9tLWJ5dGVz; HttpOnly; Path=/; Max-Age=604800; SameSite=Lax;',
      'immich_auth_type=password; HttpOnly; Path=/; Max-Age=604800; SameSite=Lax;',
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
      albumName: 'Test Album',
      createdAt: today.toISOString(),
      albumThumbnailAssetId: null,
      sharedUsers: [],
      sharedLinks: [],
      assets: [
        {
          id: 'album-asset-123',
          albumId: 'album-123',
          assetId: 'asset-123',
          albumInfo: {} as any,
          assetInfo: {
            id: 'id_1',
            userId: 'user_id_1',
            deviceAssetId: 'device_asset_id_1',
            deviceId: 'device_id_1',
            type: AssetType.VIDEO,
            originalPath: 'fake_path/jpeg',
            resizePath: '',
            createdAt: today.toISOString(),
            modifiedAt: today.toISOString(),
            isFavorite: false,
            mimeType: 'image/jpeg',
            smartInfo: {
              id: 'should-be-a-number',
              assetId: 'id_1',
              tags: [],
              objects: ['a', 'b', 'c'],
              asset: null as any,
            },
            webpPath: '',
            encodedVideoPath: '',
            duration: null,
            isVisible: true,
            livePhotoVideoId: null,
            exifInfo: {
              id: 1,
              assetId: 'id_1',
              description: 'description',
              exifImageWidth: 500,
              exifImageHeight: 500,
              fileSizeInByte: 100,
              orientation: 'orientation',
              dateTimeOriginal: today,
              modifyDate: today,
              latitude: 100,
              longitude: 100,
              city: 'city',
              state: 'state',
              country: 'country',
              make: 'camera-make',
              model: 'camera-model',
              imageName: 'fancy-image',
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
