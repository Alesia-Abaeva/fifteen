// import { values } from "lodash";
import "../style/style.scss";
import { addValues, removeNode, addClass, removeClass } from "./addNodes";
import { getMatrix, setNodeStyles } from "./positionNodes";
// import { startTime, stopTime } from "./timer";

let countItem = 16;
let itemLineNumber = Math.sqrt(countItem);
let shablonMatrix;
let winArray = new Array(countItem).fill(0).map((item, i) => i + 1);
// removeNode

addValues(countItem);

const container = document.getElementById("conteiner_item");
let itemNodes = Array.from(document.querySelectorAll(".item"));
const sizeButton = Array.from(document.querySelectorAll(".size__format"));
// [...document.querySelectorAll(".size__format")]
// counts
const machCount = document.querySelector(".count");
let counts = 0;
// time
const timerPuzzle = document.querySelector(".timer");
const stopButton = document.getElementById("stop");
let seconds = 0;
let minutes = 0;
let time;
let clockTick;
let firstClick = false;

// const

// 1. Position

itemNodes[countItem - 1].style.display = "none";
let matrix = getMatrix(
  itemNodes.map((items) => Number(items.dataset.matrixId))
);

startGame(matrix);

// const state = {
//     matrix,

// }

const nodeButtonLevels = ["lvl3", "lvl4", "lvl5", "lvl6", "lvl7", "lvl8"];
nodeButtonLevels.forEach((lvl) => {
  const node = document.getElementById(lvl);
  const number = Number(lvl.slice(-1));
  const sqrt = number ** 2;

  node.onclick = () => {
    removeClass(sizeButton, "active-button");
    node.classList.add("active-button");
    changeSize(sqrt, generateMatrix(number), `size${sqrt}`);
  };
});

// size9.onclick = () => {
//   removeClass(sizeButton, "active-button");
//   size9.classList.add("active-button");
//   changeSize(9, generateMatrix(3), "size9");
//   //   changeSize(9, [[], [], []], "size9");
// };

function startGame(matrix) {
  let shuffledArray = shuffleaAray(matrix.flat());
  matrix = getMatrix(shuffledArray);
  setPositionItems(matrix);
}

function setPositionItems(matrix) {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      const valueCoordinat = matrix[y][x];
      const node = itemNodes[valueCoordinat - 1];

      setNodeStyles(node, x, y);
    }
  }
}

function generateMatrix(number) {
  let array = [];
  for (let i = 0; i < number; i++) {
    array.push([]);
  }
  return array;
}

// 2. Shaffle
const shuffleButton = document.getElementById("shuffle");

shuffleButton.onclick = () => {
  const flatMatrix = matrix.flat();
  const shuffledArray = shuffleaAray(flatMatrix);
  matrix = getMatrix(shuffledArray, shablonMatrix, itemLineNumber);
  setPositionItems(matrix);
  resetCounter();
};

function shuffleaAray(array) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

// 3. Change position by click

let blankNumber = countItem;

container.addEventListener("click", (event) => {
  const buttonNode = event.target.closest("button");

  if (!buttonNode) {
    return;
  }

  const buttonNumber = Number(buttonNode.dataset.matrixId);
  const buttonCoords = findCoordinatesByNumber(buttonNumber, matrix);
  const blankCoords = findCoordinatesByNumber(blankNumber, matrix);
  const isValide = isValidForSwap(buttonCoords, blankCoords);
  if (isValide) {
    // timer
    if (!firstClick) {
      startTime();
      clockTick = setInterval(startTime, 1000);
      firstClick = true;
    }

    // moves
    counts += 1;
    machCount.innerHTML = `${counts}`;

    swap(blankCoords, buttonCoords, matrix), setPositionItems(matrix);
  }
});

function findCoordinatesByNumber(number, matrix) {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === number) {
        return { x, y };
      }
    }
  }
  return null;
}

function isValidForSwap(coorder1, coorder2) {
  const differentX = Math.abs(coorder1.x - coorder2.x);
  const differentY = Math.abs(coorder1.y - coorder2.y);

  return (
    (differentX === 1 || differentY === 1) &&
    (coorder1.x === coorder2.x || coorder1.y === coorder2.y)
  );
}

function swap(coorder1, coorder2, matrix) {
  const coords1Number = matrix[coorder1.y][coorder1.x];
  matrix[coorder1.y][coorder1.x] = matrix[coorder2.y][coorder2.x];
  matrix[coorder2.y][coorder2.x] = coords1Number;

  if (isWon(matrix)) {
    addWonClass();
    stopTime();
  }
}

function isWon(matrix) {
  const flatMatrix = matrix.flat();
  for (let i = 0; i < winArray.length; i++) {
    if (flatMatrix[i] !== winArray[i]) {
      return false;
    }
  }
  return true;
}

const wonClass = "puzzle__won";
function addWonClass() {
  setTimeout(() => {
    container.classList.add(wonClass);
    alert("Hooray! You solved the puzzle in ##:## and N moves!");

    setTimeout(() => {
      container.classList.remove(wonClass);
    }, 1000);
  }, 100);
}
// TODO - добавить сюда  when the game is finished, the following message is displayed "Hooray! You solved the puzzle in ##:## and N moves!". So that shuffled algorithm should work correctly - user can solve puzzle +10

// 4. Change size
function changeSize(number, matrixShablon, newStyle) {
  let numberLine = Math.sqrt(number);
  countItem = number;
  blankNumber = number;
  itemLineNumber = numberLine;
  shablonMatrix = matrixShablon;
  winArray = new Array(countItem).fill(0).map((item, i) => i + 1);

  removeNode(itemNodes);

  addValues(number);
  itemNodes = Array.from(document.querySelectorAll(".item"));

  itemNodes[countItem - 1].style.display = "none";
  addClass(itemNodes, `${newStyle}`);

  matrix = getMatrix(
    itemNodes.map((items) => Number(items.dataset.matrixId)),
    matrixShablon,
    numberLine
  );
  let shuffledArray = shuffleaAray(matrix.flat());
  matrix = getMatrix(shuffledArray, matrixShablon, numberLine);
  setPositionItems(matrix);

  return matrix;
}

// 5. Time

function startTime() {
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  time = minutes + ":" + seconds;
  seconds++;
  if (seconds > 60) {
    seconds = 0;
    minutes++;
  }

  timerPuzzle.innerText = time;
}

// stop timer for game
function stopTime() {
  console.log("stopped");
  let finalTime = time;
  clearInterval(clockTick);
  firstClick = false;
}

// 6. Try
// const machCount = document.querySelector('.count')
// let counts = 0

function resetCounter() {
  counts = 0; //add
  machCount.innerHTML = `${counts}`;
}

// ---------------------------------------------------------------------------
//
// ---------------------------------------------------------------------------

// container.classList.add('.')
// itemNodes  чтобы изменить им стиль, нужно пробежаться массивом по всем нодам
// console.log(itemNodes)
