export function indexToRowCol(index, width) {
  // Return the 0 based row/col to place this index at
  const row = Math.floor(index / width);
  const col = index % width;

  if (col < 0) {
    console.log(`${row} ${col} ${index}`);
  }
  return [row, col]; 
}