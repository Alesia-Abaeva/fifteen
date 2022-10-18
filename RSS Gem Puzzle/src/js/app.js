import "../style/style.scss";
import { addValues } from "./addPuzzle";

addValues(16);

// генерим квадраты
// const puzzleContainer = document.querySelector(".puzzle__container");
// let number = 16;
// function addValues(counts) {
//   let valuesPuzzle = new Array(counts).fill(0).map((item, index) => {
//     return index + 1;
//   });
//   console.log(valuesPuzzle);

//   for (let value in valuesPuzzle) {
//     console.log(value);
//     const puzzleNumber = document.createElement("button");
//     puzzleNumber.classList.add("puzzle_button");
//     puzzleContainer.appendChild(puzzleNumber);
//     // console.log(elem + )
//     puzzleNumber.innerText = value;
//   }
// }

// addValues(16);
