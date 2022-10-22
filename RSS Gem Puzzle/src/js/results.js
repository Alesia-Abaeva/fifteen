import { LOCAL_STORAGE_KEYS } from "./const";
import { getLocalStorage } from "./local-storage";

export const addDataInInLocal = () => {
  const nodeTime = document.querySelector(".result_time");
  const nodeMoves = document.querySelector(".result_moves");

  const dataLocal = getLocalStorage(LOCAL_STORAGE_KEYS.RESULTS);
  console.log("dataLocal------->", dataLocal);

  const bestResult = findMin(dataLocal);

  for (let elem in bestResult) {
    // создаем ноду и прроч
  }

  //   getLocalStorage(LOCAL_STORAGE_KEYS.RESULTS);
};

function findMin(array) {
  const arrayMovesValues = array
    .sort((a, b) => a.counts - b.counts)
    .slice(0, 10);
  return arrayMovesValues;
}

function find(arrayObjects, arrayMin) {}
