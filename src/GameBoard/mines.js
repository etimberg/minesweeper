import shuffle from 'lodash.shuffle';

import { rowColToIndex, indexToRowCol } from './utils';

export function generateMineIndexes(width, height, mineCount) {
  // Generate the indexes in the grid where mines will be
  const indexes = [...Array(width * height).keys()];
  return shuffle(indexes).slice(0, mineCount);
}

export function getNearbyCount(i, width, height, mineIndexes) {
  // Return the count of nearby mines
  let count = 0;
  const [row, col] = indexToRowCol(i, width);

  for (let x = -1; x <= 1; x+=1) {
    for (let y = -1; y <= 1; y += 1) {
      if (x === 0 && y === 0) {
        // Don't count ourself
        continue;
      }

      const newRow = row + y;
      const newCol = col + x;

      if (newRow < 0 || newCol < 0 || newRow >= height || newCol >= width) {
        continue;
      }

      const testIndex = rowColToIndex(newRow, newCol, width);
      if (mineIndexes.has(testIndex)) {
        count += 1;
      }
    }
  }

  return count;
}

export function floodFillMap(i, width, height, indexToNearbyCount) {
  // Generate a set of all the indexes that are connected to
  // the blank space at index i
  const indexes = new Set();

  const floodFill = (idx) => {
    if (indexes.has(idx)) {
      // If we've already seen this index then stop
      return;
    }

    indexes.add(idx);

    if (indexToNearbyCount[idx] > 0) {
      // If this index is one that has a number on it
      // then we want to not explore anything connected to it
      return;
    }

    const [row, col] = indexToRowCol(idx, width);

    if (row < height - 1) {
      floodFill(rowColToIndex(row + 1, col, width));
    }
    if (row > 0) {
      floodFill(rowColToIndex(row - 1, col, width));
    }
    if (col > 0) {
      floodFill(rowColToIndex(row, col - 1, width));
    }
    if (col < width - 1) {
      floodFill(rowColToIndex(row, col + 1, width));
    }
  };
  floodFill(i);

  return indexes;
}