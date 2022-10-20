import "../style/style.scss";
import { addValues, removeNode, addClass, removeClass } from "./addNodes";
import { getMatrix, setNodeStyles } from "./positionNodes";
import { findCoordinatesByNumber, isValidForSwap } from "./findValid";
import { generateMatrix, shuffleaAray } from "./helpers";
import audio1 from "assets/sounds/audio_1.mp3";

let countItem = 16;
let itemLineNumber = Math.sqrt(countItem);
let shablonMatrix;
let winArray = new Array(countItem).fill(0).map((item, i) => i + 1);
let stateSound = true;

addValues(countItem);

const container = document.getElementById("conteiner_item");
let itemNodes = [...document.querySelectorAll(".item")];
const sizeButton = [...document.querySelectorAll(".size__format")];
const machCount = document.querySelector(".count");
const timerPuzzle = document.querySelector(".timer");
const buttonMusic = document.getElementById("stop");
const moveSound = new Audio();
moveSound.src = audio1;

function sound() {
  if (stateSound) {
    buttonMusic.innerHTML = "Sound Off";
    buttonMusic.classList.remove("soundOn");
    buttonMusic.classList.add("soundOff");
    stateSound = false;
  } else {
    buttonMusic.innerHTML = "Sound On";
    buttonMusic.classList.remove("soundOff");
    buttonMusic.classList.add("soundOn");
    stateSound = true;
  }
}

async function playSound(state, sound) {
  if (state) {
    sound.currentTime = 0.0;
    await sound.play();
  } else {
    console.log(sound.currentTime, "end");
    await sound.pause();
    sound.currentTime = 0.0;
  }
}

buttonMusic.onclick = () => {
  sound();
};

// counts

// let counts = 0;

// time

// let seconds = 0;
// let minutes = 0;
let time;
let clockTick;
// let firstClick = false;

// function init() {
//   addValues(countItem);
//   itemNodes[countItem - 1].style.display = "none";
//   // let matrixOrigin = getMatrix(
//   //   itemNodes.map((items) => Number(items.dataset.matrixId))
//   // );
//   // let matrix = getMatrix(shuffleaAray(matrixOrigin.flat()));

//   setPositionItems(matrix);
// }

// const

// 1. Position
itemNodes[countItem - 1].style.display = "none";

// let matrix = getMatrix(
//   itemNodes.map((items) => Number(items.dataset.matrixId))
// );
let matrixOrigin = getMatrix(
  itemNodes.map((items) => Number(items.dataset.matrixId))
);
let matrix = getMatrix(shuffleaAray(matrixOrigin.flat()));

setPositionItems(matrix);

const state = {
  matrix,
  counts: 0,
  seconds: 0,
  minutes: 0,
  firstClick: false,
  countItem: 16,
  time,
  clockTick,
};

console.log(state.firstClick);

// function startGame(matrix) {
//   let shuffledArray = shuffleaAray(matrix.flat());
//   matrix = getMatrix(shuffledArray);
//   console.log(matrix, "shuffledArray");
//   // return matrix;
//   setPositionItems(matrix);
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
    resetTime();
    resetCounter();
  };
});

// size9.onclick = () => {
//   removeClass(sizeButton, "active-button");
//   size9.classList.add("active-button");
//   changeSize(9, generateMatrix(3), "size9");
//   //   changeSize(9, [[], [], []], "size9");
// };

function setPositionItems(matrix) {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      const valueCoordinat = matrix[y][x];
      const node = itemNodes[valueCoordinat - 1];

      setNodeStyles(node, x, y);
    }
  }
}

// 2. Shaffle
const shuffleButton = document.getElementById("shuffle");

shuffleButton.onclick = () => {
  const flatMatrix = matrix.flat();
  const shuffledArray = shuffleaAray(flatMatrix);
  matrix = getMatrix(shuffledArray, shablonMatrix, itemLineNumber);
  setPositionItems(matrix);
  resetCounter();
  resetTime();
};

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
    console.log("dsd");
    // timer
    if (!state.firstClick) {
      startTime();
      clockTick = setInterval(startTime, 1000);
      state.firstClick = true;
    }

    // moves
    // counts += 1;
    // machCount.innerHTML = `${counts}`;
    state.counts += 1;
    machCount.innerHTML = `${state.counts}`;
    console.log(state);

    swap(blankCoords, buttonCoords, matrix), setPositionItems(matrix);
  }
});

function swap(coorder1, coorder2, matrix) {
  const coords1Number = matrix[coorder1.y][coorder1.x];
  matrix[coorder1.y][coorder1.x] = matrix[coorder2.y][coorder2.x];
  matrix[coorder2.y][coorder2.x] = coords1Number;
  playSound(stateSound, moveSound);

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
    alert(
      `Hooray! You solved the puzzle in ${state.time} and ${state.counts} moves!`
    );

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
  if (state.seconds < 10) {
    state.seconds = "0" + state.seconds;
  }

  state.time = state.minutes + ":" + state.seconds;
  state.seconds++;
  if (state.seconds > 60) {
    state.seconds = 0;
    state.minutes++;
  }

  timerPuzzle.innerText = state.time;
}

// stop timer for game
function stopTime() {
  let finalTime = state.time;
  clearInterval(clockTick);
  state.firstClick = false;
}

function resetTime() {
  stopTime();
  state.seconds = 0;
  state.minutes = 0;
  state.time = "0" + ":" + "00";
  timerPuzzle.innerText = state.time;
}

// 6. Try
function resetCounter() {
  state.counts = 0; //add
  machCount.innerHTML = `${state.counts}`;
}

// ---------------------------------------------------------------------------
//
// ---------------------------------------------------------------------------

// container.classList.add('.')
// itemNodes  чтобы изменить им стиль, нужно пробежаться массивом по всем нодам
// console.log(itemNodes)

// Music

function setLocalStorage(value, key) {
  localStorage.setItem(key, JSON.stringify(value));
}

// if (localStorage.getItem("city")) {
//   city.value = localStorage.getItem("city");
// } else city.value = "Minsk";
setLocalStorage(state, "state");
// console.log(localStorage.getItem("state"));
// localStorage.setItem("state", state);
console.log(localStorage.getItem("state"));
const raww = localStorage.getItem("state");

console.log(JSON.parse(raww));

function getLocalStorage(value, constants) {}
