import { AccessCore, IAccessRepository } from '@app/domain';

export interface IAccessRepositoryMock {
  activity: jest.Mocked<IAccessRepository['activity']>;
  asset: jest.Mocked<IAccessRepository['asset']>;
  album: jest.Mocked<IAccessRepository['album']>;
  library: jest.Mocked<IAccessRepository['library']>;
  timeline: jest.Mocked<IAccessRepository['timeline']>;
  person: jest.Mocked<IAccessRepository['person']>;
}

export const newAccessRepositoryMock = (reset = true): IAccessRepositoryMock => {
  if (reset) {
    AccessCore.reset();
  }

  return {
    activity: {
      hasOwnerAccess: jest.fn(),

      hasAlbumOwnerAccess: jest.fn(),
    },
    asset: {
      hasOwnerAccess: jest.fn(),
      hasAlbumAccess: jest.fn(),
      hasPartnerAccess: jest.fn(),
      hasSharedLinkAccess: jest.fn(),
    },

    album: {
      hasOwnerAccess: jest.fn(),
      hasSharedAlbumAccess: jest.fn(),
      hasSharedLinkAccess: jest.fn(),
    },

    library: {
      hasOwnerAccess: jest.fn(),
      hasPartnerAccess: jest.fn(),
    },

    timeline: {
      hasPartnerAccess: jest.fn(),
    },

    person: {
      hasOwnerAccess: jest.fn(),
    },
  };
};
