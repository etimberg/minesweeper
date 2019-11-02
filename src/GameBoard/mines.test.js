import { generateMineIndexes, getNearbyCount, floodFillMap } from './mines';

describe('getNearbyCount', () => {
  it('should handle a point in the center of a 3x3 grid surrounded by mines', () => {
    const mineIndexes = new Set([0, 1, 2, 3, 5, 6, 7, 8]);
    const count = getNearbyCount(4, 3, 3, mineIndexes);
    expect(count).toEqual(8);
  });

  it('should handle getting the count in the top row', () => {
    const mineIndexes = new Set([0, 2, 6, 7, 8]);
    const count = getNearbyCount(1, 3, 3, mineIndexes);
    expect(count).toEqual(2);
  });

  it('should handle getting the count in the left column', () => {
    const mineIndexes = new Set([0, 2]);
    const count = getNearbyCount(3, 3, 3, mineIndexes);
    expect(count).toEqual(1);
  });

  it('should handle getting the count in the right column', () => {
    const mineIndexes = new Set([0, 2]);
    const count = getNearbyCount(5, 3, 3, mineIndexes);
    expect(count).toEqual(1);
  });
});

describe('generateMineIndexes', () => {
  it('should return the correct number of indexes', () => {
    const indexes = generateMineIndexes(3, 3, 2);
    expect(indexes.length).toEqual(2);
  });

  it('should not return two mines at the same location', () => {
    const indexes = new Set(generateMineIndexes(3, 3, 2));
    expect(indexes.size).toEqual(2);
  });
});

describe('floodFillMap', () => {
  it('should not handle clicking on an empty space with no adjacent empty spaces', () => {
    // 3x3 map. Flooding from the bottom left corner (index 6) with counts
    // defined in indexes 3, 4, 7
    const indexToNearbyCount = [];
    indexToNearbyCount[3] = 1;
    indexToNearbyCount[4] = 1;
    indexToNearbyCount[7] = 1;

    const floodIndexes = floodFillMap(6, 3, 3, indexToNearbyCount);
    const actual = [...floodIndexes].sort();
    const expected = [3, 4, 6, 7];
    expect(expected).toEqual(actual);
  });

  it('should fill in all directions', () => {
    // 3x3 map with no mines. Click in the center (index 4) should reveal all tiles
    const floodIndexes = floodFillMap(6, 3, 3, []);
    const actual = [...floodIndexes].sort();
    const expected = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    expect(expected).toEqual(actual);
  });

  it('should respect the top and right edges of the map', () => {
    // 3x3 map. Flooding from the top right corner (index 2) with counts
    // defined in indexes 3, 4, 7
    const indexToNearbyCount = [];
    indexToNearbyCount[3] = 1;
    indexToNearbyCount[4] = 1;
    indexToNearbyCount[7] = 1;

    const floodIndexes = floodFillMap(2, 3, 3, indexToNearbyCount);
    const actual = [...floodIndexes].sort();
    const expected = [0, 1, 2, 3, 4, 5, 7, 8];
    expect(expected).toEqual(actual);
  });
});