import { IMetadataRepository } from '@app/domain';

export const newMetadataRepositoryMock = (): jest.Mocked<IMetadataRepository> => {
  return {
    deleteCache: jest.fn(),
    init: jest.fn(),
    teardown: jest.fn(),
    reverseGeocode: jest.fn(),
    readTags: jest.fn(),
    writeTags: jest.fn(),
  };
};
