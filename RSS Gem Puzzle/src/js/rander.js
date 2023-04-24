import { createElements } from "../utils";
import { createModal } from "./modal-win";

export const randerNodes = () => {
  const shadow = document.createElement("div");
  shadow.setAttribute("id", "shadow_overlay");
  shadow.classList.add("shadow_overlay");
  document.body.appendChild(shadow);

  createModal();

  const puzzleWrapper = document.createElement("div");

  puzzleWrapper.classList.add("puzzle__wrapper");
  document.body.appendChild(puzzleWrapper);

  randerChildNode(".puzzle__wrapper", "h1", "puzzle__title", "RSS Gem Puzzle");
  randerChildNode(".puzzle__wrapper", "div", "puzzle__button_container");
  rendarButtonSettins();

  randerChildNode(".puzzle__wrapper", "div", "puzzle__information");
  renderInformationContainer();

  randerChildNode(
    ".puzzle__wrapper",
    "div",
    "puzzle__container",
    " ",
    "conteiner_item"
  );

  randerChildNode(".puzzle__wrapper", "div", "puzzle__size");
  randerButtonSize(6);

  randerChildNode(".puzzle__wrapper", "div", "puzzle__results");
};

export const randerChildNode = (parent, node, name, text, id) => {
  const parentHeader = document.querySelector(`${parent}`);
  const nodeElement = document.createElement(`${node}`);

  id && nodeElement.setAttribute("id", id);
  text && (nodeElement.innerHTML = text);
  name && nodeElement.classList.add(`${name}`);

  parentHeader.appendChild(nodeElement);

  return nodeElement;
};

const randerButtonSize = (number) => {
  const puzzleSizeContainer = document.querySelector(".puzzle__size");

  for (let i = 0; i < number; i++) {
    const inputSize = document.createElement("input");
    inputSize.classList.add("size__format");
    inputSize.setAttribute("id", `lvl${i + 3}`);
    inputSize.setAttribute("type", `button`);
    inputSize.setAttribute("value", `${i + 3}x${i + 3}`);
    puzzleSizeContainer.appendChild(inputSize);

    if (i === 1) {
      inputSize.classList.add("active-button");
    }
  }
};

const rendarButtonSettins = () => {
  randerChildNode(
    ".puzzle__button_container",
    "button",
    "button__function",
    "Shuffle and start",
    "shuffle"
  );
  randerChildNode(
    ".puzzle__button_container",
    "button",
    "button__function",
    "Sound On",
    "stop"
  );
  randerChildNode(
    ".puzzle__button_container",
    "button",
    "button__function",
    "Save",
    "save"
  );
};

const renderInformationContainer = () => {
  const moves = randerChildNode(".puzzle__information", "div", "inform__moves");
  const time = randerChildNode(".puzzle__information", "div", "inform__times");
  renderInfoWrap(moves, "Move", 0, "count");
  renderInfoWrap(time, "Time", "0:00", "timer");
};

const renderInfoWrap = (node, text, value, class_name) => {
  createElements(node, "p", "paragraf", text);
  createElements(node, "span", class_name, value);
};
