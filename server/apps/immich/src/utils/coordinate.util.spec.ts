import { roundToDecimals } from './coordinate.util';

describe('Coordinate utils roundToDecimals test', () => {
  it('should round latitude and longitude to 5', () => {
    const lat = 49.533547;
    const lon = 10.703075;

    const latRounded = roundToDecimals(lat, 5);
    const lonRounded = roundToDecimals(lon, 5);

    expect(latRounded).toBeCloseTo(lat, 4);
    expect(lonRounded).toBeCloseTo(lon, 4);
  });
});
