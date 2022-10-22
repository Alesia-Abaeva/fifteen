import { findCoordinatesByNumber } from "./find-valid";
import { isOdd } from "./helpers";

export function isSolvable(matrix) {
  let isSolvable = false;
  const array = matrix.flat();
  const invertionsInArray = inversedArray(array);
  const blankPosition = positionBlank(matrix);
  const numberForOddBoard = invertionsInArray + blankPosition;
  const isOddMatrixArray = isOdd(array.length);

  // проверка на четность

  switch (isOddMatrixArray) {
    case true:
      // То есть, когда n четно, доска n на n разрешима тогда и только тогда, когда число инверсий плюс строка пустого квадрата нечетное.
      if (isOdd(numberForOddBoard)) {
        console.log("доска не решаема");
        isSolvable = false;
      } else {
        console.log("доска решаема");
        isSolvable = true;
      }
      break;

    case false:
      // Таким образом, когда n нечетно, доска n на n разрешима тогда и только тогда, когда число ее инверсий четно.
      if (isOdd(invertionsInArray)) {
        console.log("доска решаема");
        isSolvable = true;
      } else {
        console.log("доска  не решаема");
        isSolvable = false;
      }
      break;
  }

  console.log("isSolvable", isSolvable);
  return isSolvable;
}

function positionBlank(matrix) {
  const number = matrix.flat().length;
  let position = findCoordinatesByNumber(number, matrix).y;
  return position;
}

function inversedArray(array) {
  let filredArray = array.filter((elements) => elements < array.length);

  let count = 0;
  for (let i = filredArray.length - 1; i >= 1; i--) {
    for (let j = 0; j < i; j++) {
      if (filredArray[i] < filredArray[j]) {
        count++;
      }
    }
  }

  return count;
}
