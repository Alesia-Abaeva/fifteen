import { ChangePositionOnClick, state } from ".";

export function dragAndDrop() {
  const container = document.querySelector(".puzzle__container");
  const item = [...document.querySelectorAll(".item")];
  console.log(container);

  item.forEach((elem) => addEventListener("dragstart", dragstart));
  item.forEach((elem) => addEventListener("dragend", dragend));

  container.addEventListener("dragover", dragover);
  container.addEventListener("dragenter", dragenter);
  container.addEventListener("dragleave", dragleave);
  container.addEventListener("dragdrop", dragdrop);
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
  event.preventDefault(); // LIFEHACK - делаем, чтобы элемент перемещался внутри дом дерева
}

function dragenter(event) {}

function dragleave(event) {}

function dragdrop(event) {}
