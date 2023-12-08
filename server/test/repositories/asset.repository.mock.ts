import { IAssetRepository } from '@app/domain';

export const newAssetRepositoryMock = (): jest.Mocked<IAssetRepository> => {
  return {
    create: jest.fn(),
    upsertExif: jest.fn(),
    upsertJobStatus: jest.fn(),
    getByDate: jest.fn(),
    getByDayOfYear: jest.fn(),
    getByIds: jest.fn().mockResolvedValue([]),
    getByAlbumId: jest.fn(),
    getByUserId: jest.fn(),
    getById: jest.fn(),
    getWithout: jest.fn(),
    getByChecksum: jest.fn(),
    getWith: jest.fn(),
    getRandom: jest.fn(),
    getFirstAssetForAlbumId: jest.fn(),
    getLastUpdatedAssetForAlbumId: jest.fn(),
    getAll: jest.fn().mockResolvedValue({ items: [], hasNextPage: false }),
    getAllByDeviceId: jest.fn(),
    updateAll: jest.fn(),
    getByLibraryId: jest.fn(),
    getByLibraryIdAndOriginalPath: jest.fn(),
    deleteAll: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
    findLivePhotoMatch: jest.fn(),
    getMapMarkers: jest.fn(),
    getStatistics: jest.fn(),
    getTimeBucket: jest.fn(),
    getTimeBuckets: jest.fn(),
    restoreAll: jest.fn(),
    softDeleteAll: jest.fn(),
    search: jest.fn(),
    getAssetIdByCity: jest.fn(),
    getAssetIdByTag: jest.fn(),
    searchMetadata: jest.fn(),
  };
};
