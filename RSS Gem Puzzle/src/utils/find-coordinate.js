export function findCoordinatesByNumber(number, matrix) {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === number) {
        return { x, y };
      }
    }
  }
  return null;
}

export function isValidForSwap(a, b) {
  const differentX = Math.abs(a.x - b.x);
  const differentY = Math.abs(a.y - b.y);

  return (differentX === 1 || differentY === 1) && (a.x === b.x || a.y === b.y);
}
