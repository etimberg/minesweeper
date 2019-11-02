import shuffle from 'lodash.shuffle';

import { rowColToIndex, indexToRowCol } from './utils';

export function generateMineIndexes(width, height, mineCount) {
  // Generate the indexes in the grid where mines will be
  const indexes = [...Array(width * height).keys()];
  return shuffle(indexes).slice(0, mineCount);
}

export function getNearbyCount(i, width, mineIndexes) {
  // Return the count of nearby mines
  let count = 0;
  const [row, col] = indexToRowCol(i, width);

  for (let x = -1; x <= 1; x+=1) {
    for (let y = -1; y <= 1; y += 1) {
      if (x === 0 && y === 0) {
        // Don't count ourself
        continue;
      }

      const testIndex = rowColToIndex(row + y, col + x, width);
      if (mineIndexes.has(testIndex)) {
        count += 1;
      }
    }
  }

  return count;
}