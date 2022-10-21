export function shuffleaAray(array) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

export function generateMatrix(number) {
  let array = [];
  for (let i = 0; i < number; i++) {
    array.push([]);
  }
  return array;
}