import "../style/style.scss";
import { addValues, removeNode, addClass, removeClass } from "./add-nodes";
import { getMatrix, setNodeStyles } from "./position-nodes";
import { findCoordinatesByNumber, isValidForSwap } from "./find-valid";
import { generateMatrix, shuffleaAray } from "./helpers";
import audio1 from "assets/sounds/audio_1.mp3";
import { setLocalStorage, getLocalStorage } from "./local-storage";
import { LOCAL_STORAGE_KEYS } from "./const";

let countItem = 16;
let itemLineNumber = Math.sqrt(countItem);
let shablonMatrix;
let winArray = new Array(countItem).fill(0).map((item, i) => i + 1);
let stateSound = true;

// остановилась на переменной countItem -  если брать ее из объекта, то руинится все, потому что инициализация идет до объявления переменной

addValues(countItem);

const container = document.getElementById("conteiner_item");
let itemNodes = [...document.querySelectorAll(".item")];
const sizeButton = [...document.querySelectorAll(".size__format")];
const machCount = document.querySelector(".count");
const timerPuzzle = document.querySelector(".timer");
const buttonMusic = document.getElementById("stop");
const buttonSave = document.getElementById("save");
const moveSound = new Audio();
moveSound.src = audio1;

buttonMusic.onclick = () => {
  sound();
};

buttonSave.onclick = () => {
  setLocalStorage(state, LOCAL_STORAGE_KEYS.STORAGE);
};

// counts

// time
// let firstClick = false;
// let counts = 0;
// let seconds = 0;
// let minutes = 0;
let time;
let clockTick;

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

const state = getLocalStorage(LOCAL_STORAGE_KEYS.STORAGE) ?? {
  matrix,
  counts: 0,
  seconds: 0,
  minutes: 0,
  firstClick: false,
  countItem: 16,
  time,
  clockTick,
  winArray,
  // countItem,
};

setPositionItems(state.matrix);

console.log(state);

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
  const flatMatrix = state.matrix.flat();
  const shuffledArray = shuffleaAray(flatMatrix);
  state.matrix = getMatrix(shuffledArray, shablonMatrix, itemLineNumber);
  setPositionItems(state.matrix);
  resetCounter();
  resetTime();
};

// 3. Change position by click

let blankNumber = state.countItem;

container.addEventListener("click", (event) => {
  const buttonNode = event.target.closest("button");

  if (!buttonNode) {
    return;
  }

  const buttonNumber = Number(buttonNode.dataset.matrixId);
  const buttonCoords = findCoordinatesByNumber(buttonNumber, state.matrix);
  const blankCoords = findCoordinatesByNumber(blankNumber, state.matrix);
  const isValide = isValidForSwap(buttonCoords, blankCoords);
  if (isValide) {
    console.log("dsd");
    // timer
    if (!state.firstClick) {
      startTime();
      state.clockTick = setInterval(startTime, 1000);
      state.firstClick = true;
    }

    // moves
    // counts += 1;
    // machCount.innerHTML = `${counts}`;
    state.counts += 1;
    machCount.innerHTML = `${state.counts}`;

    swap(blankCoords, buttonCoords, state.matrix, state.winArray),
      setPositionItems(state.matrix);
  }
});

function swap(coorder1, coorder2, matrix, winArray) {
  const coords1Number = matrix[coorder1.y][coorder1.x];
  matrix[coorder1.y][coorder1.x] = matrix[coorder2.y][coorder2.x];
  matrix[coorder2.y][coorder2.x] = coords1Number;
  playSound(stateSound, moveSound);

  if (isWon(matrix, winArray)) {
    addWonClass();
    stopTime();
  }
}

function isWon(matrix, winArray) {
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
function changeSize(number, template, newStyle) {
  let numberLine = Math.sqrt(number);
  state.countItem = number;
  blankNumber = number;
  itemLineNumber = numberLine;
  shablonMatrix = template;
  state.winArray = new Array(state.countItem).fill(0).map((item, i) => i + 1);

  removeNode(itemNodes);

  addValues(number);
  itemNodes = Array.from(document.querySelectorAll(".item"));

  itemNodes[state.countItem - 1].style.display = "none";
  addClass(itemNodes, `${newStyle}`);

  state.matrix = getMatrix(
    itemNodes.map((items) => Number(items.dataset.matrixId)),
    template,
    numberLine
  );
  let shuffledArray = shuffleaAray(state.matrix.flat());
  state.matrix = getMatrix(shuffledArray, template, numberLine);
  setPositionItems(state.matrix);

  return state.matrix;
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
  clearInterval(state.clockTick);
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
function initPuzzleInformation() {
  machCount.innerHTML = `${state.counts}`;
  timerPuzzle.innerText = state.time;
}
initPuzzleInformation();

function resetCounter() {
  state.counts = 0; //add
  machCount.innerHTML = `${state.counts}`;
}

// Sound
async function playSound(state, sound) {
  if (state) {
    sound.currentTime = 0.0;
    await sound.play();
  } else {
    // console.log(sound.currentTime, "end");
    await sound.pause();
    sound.currentTime = 0.0;
  }
}

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
