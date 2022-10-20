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

export function isValidForSwap(coorder1, coorder2) {
  const differentX = Math.abs(coorder1.x - coorder2.x);
  const differentY = Math.abs(coorder1.y - coorder2.y);

  return (
    (differentX === 1 || differentY === 1) &&
    (coorder1.x === coorder2.x || coorder1.y === coorder2.y)
  );
}
