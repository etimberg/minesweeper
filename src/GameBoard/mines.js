import shuffle from 'lodash.shuffle';

export function generateMineIndexes(width, height, mineCount) {
  // Generate the indexes in the grid where mines will be
  const indexes = [...Array(width * height).keys()];
  return shuffle(indexes).slice(0, mineCount);
}