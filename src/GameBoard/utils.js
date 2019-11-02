export function indexToRowCol(index, width) {
  // Return the 0 based row/col to place this index at
  const row = Math.floor(index / width);
  const col = index % width;
  return [row, col]; 
}

export function rowColToIndex(row, col, width) {
  // Return the 0 based index of this row/column (also 0 bsaed)
  return (row * width) + col;
}
