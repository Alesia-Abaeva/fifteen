import { LOCAL_STORAGE_KEYS } from '../../../const/local-storage';
import { getLocalStorage, removeNode } from '../../../utils';

function findTenMin(array) {
  const arrayMovesValues = array.sort((a, b) => a.counts - b.counts).slice(0, 10);
  return arrayMovesValues;
}

const addDataFromArray = (created, values, parentNode, style) => {
  const node = document.createElement(`${created}`);
  style && node.classList.add(`${style}`);
  values && (node.innerText = `${values}`);
  parentNode.appendChild(node);
};

export const addDataInInLocal = () => {
  const nodeTime = document.querySelector('.result_time');
  const nodeMoves = document.querySelector('.result_moves');
  const dataLocal = getLocalStorage(LOCAL_STORAGE_KEYS.RESULTS);

  if (dataLocal === null || dataLocal === undefined) {
    return;
  }

  const bestResult = findTenMin(dataLocal);

  bestResult.forEach((element) => {
    addDataFromArray('p', element.counts, nodeMoves, 'value-results');
    addDataFromArray('p', element.time, nodeTime, 'value-results');
  });
};

export const updateResults = () => {
  const value = [...document.querySelectorAll('.value-results')];
  removeNode(value);
  addDataInInLocal();
};
