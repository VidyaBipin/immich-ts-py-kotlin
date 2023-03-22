import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { CheckExistenceOfAssetsDto } from './check-existing-assets.dto';

describe('CheckExistingAssetsDto', () => {
  it('should fail with an empty list', () => {
    const dto = plainToInstance(CheckExistenceOfAssetsDto, { deviceAssetIds: [], deviceId: 'test-device' });
    const errors = validateSync(dto);
    expect(errors).toHaveLength(1);
    expect(errors[0].property).toEqual('deviceAssetIds');
  });

  it('should fail with an empty string', () => {
    const dto = plainToInstance(CheckExistenceOfAssetsDto, { deviceAssetIds: [''], deviceId: 'test-device' });
    const errors = validateSync(dto);
    expect(errors).toHaveLength(1);
    expect(errors[0].property).toEqual('deviceAssetIds');
  });

  it('should work with valid asset ids', () => {
    const dto = plainToInstance(CheckExistenceOfAssetsDto, {
      deviceAssetIds: ['asset-1', 'asset-2'],
      deviceId: 'test-device',
    });
    const errors = validateSync(dto);
    expect(errors).toHaveLength(0);
  });
});
