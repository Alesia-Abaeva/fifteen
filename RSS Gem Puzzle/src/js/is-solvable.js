import { findCoordinatesByNumber, isOdd } from "../utils";

export function isSolvable(matrix) {
  let isSolvable = false;
  const array = matrix.flat();
  const reverseArray = reversArray(array);
  const blankPosition = positionBlank(matrix);
  const numberForOddBoard = reverseArray + blankPosition;
  const isOddMatrixArray = isOdd(array.length);

  // проверка на четность

  switch (isOddMatrixArray) {
    case true:
      // когда n четно, доска n на n разрешима тогда и только тогда, когда число инверсий плюс строка пустого квадрата нечетное.
      if (isOdd(numberForOddBoard)) {
        isSolvable = false;
      } else {
        isSolvable = true;
      }
      break;

    case false:
      // когда n нечетно, доска n на n разрешима тогда и только тогда, когда число ее инверсий четно.
      if (isOdd(reverseArray)) {
        isSolvable = true;
      } else {
        isSolvable = false;
      }
      break;
  }

  return isSolvable;
}

function positionBlank(matrix) {
  const number = matrix.flat().length;
  let position = findCoordinatesByNumber(number, matrix).y;
  return position;
}

function reversArray(array) {
  let filteredArray = array.filter((elements) => elements < array.length);

  let count = 0;
  for (let i = filteredArray.length - 1; i >= 1; i--) {
    for (let j = 0; j < i; j++) {
      if (filteredArray[i] < filteredArray[j]) {
        count++;
      }
    }
  }

  return count;
}
