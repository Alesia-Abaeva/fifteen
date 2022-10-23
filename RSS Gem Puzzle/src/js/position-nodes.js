export function getMatrix(array, matrix = [[], [], [], []], count = 4) {
  let y = 0;
  let x = 0;

  for (let i = 0; i < array.length; i++) {
    if (x >= count) {
      y++;
      x = 0;
    }

    matrix[y][x] = array[i];
    x++;
  }

  return matrix;
}

export function setNodeStyles(node, x, y) {
  const shiftPs = 100;
  setTimeout(() => {
    node.style.transform = `translate3D(${x * shiftPs}%, ${y * shiftPs}%, 0)`;
  }, 100);
}
