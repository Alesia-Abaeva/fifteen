import "../style/style.scss";
import {
  addClass,
  addResults,
  addValues,
  removeClass,
  removeNode,
} from "./add-nodes";
import { LOCAL_STORAGE_KEYS } from "./const";
import { findCoordinatesByNumber, isValidForSwap } from "./find-valid";
import { generateMatrix, shuffleaAray } from "./helpers";
import { setLocalStorage, getLocalStorage } from "./local-storage";
import { getMatrix, setNodeStyles } from "./position-nodes";
import audio1 from "assets/sounds/audio_1.mp3";
import { isSolvable } from "./is-solvable";
import { addDataInInLocal, updateResults } from "./results";
import { randerNodes } from "./rander";

const state = getLocalStorage(LOCAL_STORAGE_KEYS.STORAGE) ?? {
  matrix: [],
  counts: 0,
  seconds: 0,
  minutes: 0,
  firstClick: false,
  countItem: 16,
  blankNumber: 16,
  time: "0:00",
  clockTick: "",
  winArray: [],
  itemNodes: [],
  templateMatrix: [],
  countElementInLine: 4,
  stateSound: true,
  save: false,
  style: "size16",
};
randerNodes();
const sizeButton = [...document.querySelectorAll(".size__format")];
const container = document.getElementById("conteiner_item");
const shuffleButton = document.getElementById("shuffle");
const timerPuzzle = document.querySelector(".timer");
const buttonMusic = document.getElementById("stop");
const buttonSave = document.getElementById("save");
const machCount = document.querySelector(".count");
const wonClass = "puzzle__won";
const moveSound = new Audio();
moveSound.src = audio1;
const nodeButtonLevels = ["lvl3", "lvl4", "lvl5", "lvl6", "lvl7", "lvl8"];
const containerResult = document.querySelector(".results_best");

// Start game
initGame();
// randerNodes();
function initGame() {
  console.log(getLocalStorage(LOCAL_STORAGE_KEYS.STORAGE));
  addValues(state.countItem);
  addResults();
  addDataInInLocal();

  state.itemNodes = [...document.querySelectorAll(".item")];
  state.itemNodes[state.countItem - 1].style.display = "none";

  addClass(state.itemNodes, `size${state.countItem}`); //!!!!!!!!!!!

  if (getLocalStorage(LOCAL_STORAGE_KEYS.STORAGE) === null) {
    let orderMatrix = getMatrix(
      state.itemNodes.map((items) => Number(items.dataset.matrixId))
    );
    let matrixVerif = getMatrix(shuffleaAray(orderMatrix.flat()));
    // state.matrix =

    while (!isSolvable(matrixVerif)) {
      matrixVerif = getMatrix(shuffleaAray(orderMatrix.flat()));
    }
    state.matrix = matrixVerif;

    //
    state.matrix = getMatrix(
      state.itemNodes.map((items) => Number(items.dataset.matrixId))
    );
  } else {
    state.matrix;
    startTime();
    state.clockTick = setInterval(startTime, 1000);
    removeClass(sizeButton, "active-button");
    const node = document.getElementById(
      nodeButtonLevels[state.countElementInLine - 3]
    );

    node.classList.add("active-button");
  }

  setPositionItems(state.matrix, state.itemNodes);

  state.winArray = new Array(state.countItem).fill(0).map((item, i) => i + 1);
  state.countElementInLine = Math.sqrt(state.countItem);
  state.templateMatrix = generateMatrix(state.countElementInLine);

  initPuzzleInformation();

  console.log("state INIt", state);
}

// Position puzzle

function setPositionItems(matrix, nodes) {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      const valueCoordinat = matrix[y][x];
      const node = state.itemNodes[valueCoordinat - 1];

      setNodeStyles(node, x, y);
    }
  }
}

// Change size

nodeButtonLevels.forEach((lvl) => {
  const node = document.getElementById(lvl);
  const number = Number(lvl.slice(-1));
  const sqrt = number ** 2;

  console.log(node);
  node.onclick = () => {
    removeClass(sizeButton, "active-button");
    node.classList.add("active-button");
    changeSize(sqrt, generateMatrix(number), `size${sqrt}`);

    resetTime();
    resetCounter();
  };
});

function changeSize(number, template, style) {
  //   state.style = style;
  state.countElementInLine = Math.sqrt(number);
  console.log("template", template);
  state.templateMatrix = generateMatrix(state.countElementInLine);

  // изменяем состонияе счетчика
  state.countItem = number;
  state.blankNumber = number;
  state.winArray = new Array(state.countItem).fill(0).map((item, i) => i + 1);

  //   //   удаляем ноды
  removeNode(state.itemNodes);

  //   //   добавляем по новому счетчику
  addValues(state.countItem);

  //   //   обновляем значения константы
  state.itemNodes = [...document.querySelectorAll(".item")];
  state.itemNodes[state.countItem - 1].style.display = "none";

  //   //  добавляем стили
  addClass(state.itemNodes, `${style}`);

  //  генерим новую матрицу
  let orderMatrix = getMatrix(
    state.itemNodes.map((items) => Number(items.dataset.matrixId)),
    template,
    state.countElementInLine
  );

  let matrixVerifSize = getMatrix(
    shuffleaAray(orderMatrix.flat()),
    template,
    state.countElementInLine
  );
  // state.matrix =

  while (!isSolvable(matrixVerifSize)) {
    matrixVerifSize = getMatrix(
      shuffleaAray(orderMatrix.flat()),
      template,
      state.countElementInLine
    );
  }
  state.matrix = matrixVerifSize;

  setPositionItems(state.matrix, state.itemNodes);

  console.log("state-CHANGE", state);
}

// Buttons Shuffle and Start

shuffleButton.onclick = () => {
  let matrixVerifShuffle = getMatrix(
    shuffleaAray(state.matrix.flat()),
    state.templateMatrix,
    state.countElementInLine
  );
  // state.matrix =

  while (!isSolvable(matrixVerifShuffle)) {
    matrixVerifShuffle = getMatrix(
      shuffleaAray(state.matrix.flat()),
      state.templateMatrix,
      state.countElementInLine
    );
  }
  state.matrix = matrixVerifShuffle;

  setPositionItems(state.matrix);
  resetCounter();
  resetTime();
  localStorage.removeItem(LOCAL_STORAGE_KEYS.STORAGE); // очищаем local storage, так как запускаем новую игру!
};

// Change position on click

container.addEventListener("click", (event) => {
  ChangePositionOnClick(event, state.blankNumber, state.matrix, state.winArray);
});

const ChangePositionOnClick = (event, blankNumber, matrix, matrixWins) => {
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
      state.clockTick = setInterval(startTime, 1000);
      state.firstClick = true;
    }

    // moves
    startCounter();

    swap(blankCoords, buttonCoords, matrix, matrixWins);
    setPositionItems(matrix);
  }
};

function swap(coorder1, coorder2, matrix, winArray) {
  const coords1Number = matrix[coorder1.y][coorder1.x];
  matrix[coorder1.y][coorder1.x] = matrix[coorder2.y][coorder2.x];
  matrix[coorder2.y][coorder2.x] = coords1Number;
  playSound(state.stateSound, moveSound);

  if (isWon(matrix, winArray)) {
    addWonClass();
    stopTime();
    const existedResult = getLocalStorage(LOCAL_STORAGE_KEYS.RESULTS) ?? [];
    setLocalStorage(
      [...existedResult, { time: state.time, counts: state.counts }],
      LOCAL_STORAGE_KEYS.RESULTS
    ); //передаем данные по результатам
    localStorage.removeItem(LOCAL_STORAGE_KEYS.STORAGE); // очищаем local storage, так как запускаем новую игру!

    const localResult = getLocalStorage(LOCAL_STORAGE_KEYS.RESULTS);
    console.log(localResult.length);
    if (
      localResult === null ||
      localResult === undefined ||
      localResult.length == 1
    ) {
      console.log("новый локал");
      addDataInInLocal();
    } else {
      console.log("локал заполнег");
      updateResults();
    }
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

async function playSound(state, sound) {
  if (state) {
    sound.currentTime = 0.0;
    await sound.play();
  } else {
    await sound.pause();
    sound.currentTime = 0.0;
  }
}

function sound() {
  if (state.stateSound) {
    buttonMusic.innerHTML = "Sound Off";
    buttonMusic.classList.remove("soundOn");
    buttonMusic.classList.add("soundOff");
    state.stateSound = false;
  } else {
    buttonMusic.innerHTML = "Sound On";
    buttonMusic.classList.remove("soundOff");
    buttonMusic.classList.add("soundOn");
    state.stateSound = true;
  }
}

// Buttons sound ON
buttonMusic.onclick = () => {
  sound();
};

// Moves
function resetCounter() {
  state.counts = 0; //add
  machCount.innerHTML = `${state.counts}`;
}

function startCounter() {
  state.counts += 1;
  machCount.innerHTML = `${state.counts}`;
}

// Time

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

function initPuzzleInformation() {
  machCount.innerHTML = `${state.counts}`;
  timerPuzzle.innerText = state.time;
}

// Button Save
buttonSave.onclick = () => {
  state.save = true;
  setLocalStorage(state, LOCAL_STORAGE_KEYS.STORAGE);
};
