import { IAssetStackRepository } from 'src/domain';

export const newAssetStackRepositoryMock = (): jest.Mocked<IAssetStackRepository> => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    getById: jest.fn(),
  };
};
