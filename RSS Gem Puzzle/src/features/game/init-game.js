import { Results } from '../../components/Result/Result';
import { addValues } from '../../js/add-nodes';
import { addDataInInLocal } from '../../js/results';
import {
  addClass,
  dragAndDrop,
  generateMatrix,
  getLocalStorage,
  getMatrix,
  removeClass,
  shuffleArray,
} from '../../utils';

function initGame(state) {
  addValues(state.countItem);
  Results();
  addDataInInLocal();
  dragAndDrop();

  state.itemNodes = [...document.querySelectorAll('.item')];
  state.itemNodes[state.countItem - 1].style.display = 'none';

  addClass(state.itemNodes, `size${state.countItem}`);

  if (getLocalStorage(LOCAL_STORAGE_KEYS.STORAGE) === null) {
    let orderMatrix = getMatrix(state.itemNodes.map((items) => Number(items.dataset.matrixId)));
    let matrixVerif = getMatrix(shuffleArray(orderMatrix.flat()));

    while (!isSolvable(matrixVerif)) {
      matrixVerif = getMatrix(shuffleArray(orderMatrix.flat()));
    }
    state.matrix = matrixVerif;
  } else {
    state.matrix;
    startTime();
    state.clockTick = setInterval(startTime, 1000);
    removeClass(sizeButton, 'active-button');
    const node = document.getElementById(nodeButtonLevels[state.countElementInLine - 3]);

    node.classList.add('active-button');
  }

  setPositionItems(state.matrix, state.itemNodes); //

  state.winArray = new Array(state.countItem).fill(0).map((item, i) => i + 1);
  state.countElementInLine = Math.sqrt(state.countItem);
  state.templateMatrix = generateMatrix(state.countElementInLine);

  initPuzzleInformation(); //
}
