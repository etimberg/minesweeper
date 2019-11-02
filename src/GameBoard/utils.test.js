import { indexToRowCol, rowColToIndex } from './utils';

describe('indexToRowCol', () => {
  it('should generate the correct index at the top left', () => {
    const [row, col] = indexToRowCol(0, 10);
    expect(row).toEqual(0);
    expect(col).toEqual(0);
  });

  it('should generate the correct index at the top right', () => {
    const [row, col] = indexToRowCol(9, 10);
    expect(row).toEqual(0);
    expect(col).toEqual(9);
  });

  it('should generate the correct row', () => {
    const [row, col] = indexToRowCol(10, 10);
    expect(row).toEqual(1);
    expect(col).toEqual(0);
  });
});

describe('rowColToIndex', () => {
  it('should handle the top left corner', () => {
    const index = rowColToIndex(0, 0, 10);
    expect(index).toEqual(0);
  });

  it('should handle the top right corner', () => {
    const index = rowColToIndex(0, 9, 10);
    expect(index).toEqual(9);
  });

  it('should handle non 0 rows', () => {
    const index = rowColToIndex(1, 0, 10);
    expect(index).toEqual(10);
  });
});