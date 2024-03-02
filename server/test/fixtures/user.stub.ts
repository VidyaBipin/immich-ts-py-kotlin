import { UserAvatarColor, UserEntity } from '@app/infra/entities';
import { authStub } from './auth.stub';

export const userDto = {
  user1: {
    email: 'user1@immich.app',
    password: 'Password123',
    name: 'User 1',
  },
  user2: {
    email: 'user2@immich.app',
    password: 'Password123',
    name: 'User 2',
  },
  user3: {
    email: 'user3@immich.app',
    password: 'Password123',
    name: 'User 3',
  },
  userWithQuota: {
    email: 'quota-user@immich.app',
    password: 'Password123',
    name: 'User with quota',
    quotaSizeInBytes: 42,
  },
  userWithDefaultStorageQuota: {
    email: 'test@immich.com',
    name: ' ',
    oauthId: 'my-auth-user-sub',
    quotaSizeInBytes: 1_073_741_824,
    storageLabel: null,
  },
  userWithStorageQuotaClaim: {
    email: 'test@immich.com',
    name: ' ',
    oauthId: 'my-auth-user-sub',
    quotaSizeInBytes: 5_368_709_120,
    storageLabel: null,
  },
  userWithUnsetQuotaClaim: {
    email: 'test@immich.com',
    name: ' ',
    oauthId: 'my-auth-user-sub',
    quotaSizeInBytes: null,
    storageLabel: null,
  },
};

export const userStub = {
  admin: Object.freeze<UserEntity>({
    ...authStub.admin.user,
    password: 'admin_password',
    name: 'admin_name',
    storageLabel: 'admin',
    oauthId: '',
    shouldChangePassword: false,
    profileImagePath: '',
    createdAt: new Date('2021-01-01'),
    deletedAt: null,
    updatedAt: new Date('2021-01-01'),
    tags: [],
    assets: [],
    memoriesEnabled: true,
    avatarColor: UserAvatarColor.PRIMARY,
    quotaSizeInBytes: null,
    quotaUsageInBytes: 0,
  }),
  user1: Object.freeze<UserEntity>({
    ...authStub.user1.user,
    password: 'immich_password',
    name: 'immich_name',
    storageLabel: null,
    oauthId: '',
    shouldChangePassword: false,
    profileImagePath: '',
    createdAt: new Date('2021-01-01'),
    deletedAt: null,
    updatedAt: new Date('2021-01-01'),
    tags: [],
    assets: [],
    memoriesEnabled: true,
    avatarColor: UserAvatarColor.PRIMARY,
    quotaSizeInBytes: null,
    quotaUsageInBytes: 0,
  }),
  user2: Object.freeze<UserEntity>({
    ...authStub.user2.user,
    password: 'immich_password',
    name: 'immich_name',
    storageLabel: null,
    oauthId: '',
    shouldChangePassword: false,
    profileImagePath: '',
    createdAt: new Date('2021-01-01'),
    deletedAt: null,
    updatedAt: new Date('2021-01-01'),
    tags: [],
    assets: [],
    memoriesEnabled: true,
    avatarColor: UserAvatarColor.PRIMARY,
    quotaSizeInBytes: null,
    quotaUsageInBytes: 0,
  }),
  storageLabel: Object.freeze<UserEntity>({
    ...authStub.user1.user,
    password: 'immich_password',
    name: 'immich_name',
    storageLabel: 'label-1',
    oauthId: '',
    shouldChangePassword: false,
    profileImagePath: '',
    createdAt: new Date('2021-01-01'),
    deletedAt: null,
    updatedAt: new Date('2021-01-01'),
    tags: [],
    assets: [],
    memoriesEnabled: true,
    avatarColor: UserAvatarColor.PRIMARY,
    quotaSizeInBytes: null,
    quotaUsageInBytes: 0,
  }),
  externalPathRoot: Object.freeze<UserEntity>({
    ...authStub.user1.user,
    password: 'immich_password',
    name: 'immich_name',
    storageLabel: 'label-1',
    oauthId: '',
    shouldChangePassword: false,
    profileImagePath: '',
    createdAt: new Date('2021-01-01'),
    deletedAt: null,
    updatedAt: new Date('2021-01-01'),
    tags: [],
    assets: [],
    memoriesEnabled: true,
    avatarColor: UserAvatarColor.PRIMARY,
    quotaSizeInBytes: null,
    quotaUsageInBytes: 0,
  }),
  profilePath: Object.freeze<UserEntity>({
    ...authStub.user1.user,
    password: 'immich_password',
    name: 'immich_name',
    storageLabel: 'label-1',
    oauthId: '',
    shouldChangePassword: false,
    profileImagePath: '/path/to/profile.jpg',
    createdAt: new Date('2021-01-01'),
    deletedAt: null,
    updatedAt: new Date('2021-01-01'),
    tags: [],
    assets: [],
    memoriesEnabled: true,
    avatarColor: UserAvatarColor.PRIMARY,
    quotaSizeInBytes: null,
    quotaUsageInBytes: 0,
  }),
};
