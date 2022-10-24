import { getLocalStorage } from "./local-storage";
// import { createElements } from "./rander";

export function addValues(counts) {
  const puzzleContainer = document.querySelector(".puzzle__container");

  let valuesPuzzle = new Array(counts).fill(0).map((item, index) => {
    return index + 1;
  });

  for (let value of valuesPuzzle) {
    const puzzleNumber = document.createElement("button");
    puzzleNumber.classList.add("item");
    puzzleNumber.setAttribute("data-matrix-id", value);
    puzzleNumber.setAttribute("draggable", true);

    puzzleNumber.innerHTML = `<span class="button-border">${value}</span>`;
    // puzzleNumber.innerHTML = `<span class="button-border" draggable=true>${value}</span>`;

    puzzleContainer.appendChild(puzzleNumber);
  }
}

export function removeNode(node) {
  node.forEach((elem) => {
    elem.parentNode.removeChild(elem);
  });
}

export function addClass(node, clas) {
  node.forEach((elem) => {
    elem.classList.add(clas);
  });
}

export function removeClass(node, clas) {
  node.forEach((elem) => {
    elem.classList.remove(clas);
  });
}

export function addResults() {
  const puzzleResults = document.querySelector(".puzzle__results");
  const resultButton = document.createElement("button");

  resultButton.classList.add("button__function");
  resultButton.classList.add("result_button");
  resultButton.setAttribute("id", "results");
  resultButton.innerText = "Results";
  puzzleResults.appendChild(resultButton);

  const containerHeader = document.createElement("div");
  containerHeader.classList.add("results_header");

  const containerResult = document.createElement("div");
  containerResult.classList.add("results_best");

  puzzleResults.appendChild(containerHeader);
  puzzleResults.appendChild(containerResult);

  const movesHeader = createElements(
    containerHeader,
    "div",
    "result_moves_header",
    "Moves"
  );

  const timeHeader = createElements(
    containerHeader,
    "div",
    "result_time_header",
    "Time"
  );

  const movesNode = createElements(containerResult, "div", "result_moves");
  const timeNode = createElements(containerResult, "div", "result_time");
}

export const createElements = (parentNode, element, style_class, text) => {
  const node = document.createElement(`${element}`);
  style_class && node.classList.add(`${style_class}`);
  parentNode.appendChild(node);
  text && (node.innerHTML = text);

  return node;
};
