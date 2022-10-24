import { randerChildNode, randerNodes } from "./rander";

export function createModal() {
  const modalContainer = document.createElement("div");
  modalContainer.classList.add("modal__container");
  document.body.appendChild(modalContainer);
  const modalWindow = randerChildNode(
    ".modal__container",
    "div",
    "modal_window"
  );
  const modalContent = randerChildNode(".modal_window", "div", "modal_text");
}

export function openModal(moves, time) {
  const shadow = document.querySelector(".shadow_overlay");
  const modalContainer = document.querySelector(".modal__container");
  const modalWindow = document.querySelector(".modal_window");
  const modalContent = document.querySelector(".modal_text");
  shadow.classList.add("shadow_active");
  modalContainer.classList.add("open_modal");
  modalWindow.classList.add("open_modal");

  modalContent.innerHTML = `Hooray! You solved the puzzle in ${time} and ${moves} moves!`;
}

export function closeModal() {
  const shadow = document.querySelector(".shadow_overlay");
  const modalContainer = document.querySelector(".modal__container");
  const modalWindow = document.querySelector(".modal_window");
  const contetnt = document.querySelector(".modal_text");
  //   const windowwModal = document.querySelector(".modal_window");

  shadow.onclick = (event) => {
    contetnt.innerHTML = "";
    shadow.classList.remove("shadow_active");
    modalContainer.classList.remove("open_modal");
    modalWindow.classList.remove("open_modal");
  };
}
