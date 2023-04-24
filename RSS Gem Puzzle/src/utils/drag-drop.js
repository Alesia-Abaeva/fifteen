import { ChangePositionOnClick, state } from "../js";

export function dragAndDrop() {
  const container = document.querySelector(".puzzle__container");
  const item = [...document.querySelectorAll(".item")];

  item.forEach((elem) => addEventListener("dragstart", dragstart));
  item.forEach((elem) => addEventListener("dragend", dragend));

  container.addEventListener("dragover", dragover);
}

function dragstart(event) {
  setTimeout(() => {
    event.target.classList.add("hide");
  }, 0);
}

function dragend(event) {
  ChangePositionOnClick(event, state.blankNumber, state.matrix, state.winArray);
  setTimeout(() => {
    event.target.classList.remove("hide");
  }, 180);
}

function dragover(event) {
  event.preventDefault();
}