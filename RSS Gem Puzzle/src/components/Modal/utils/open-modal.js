import { findModalElement } from "./find-elements";

export function openModal(moves, time) {
  const { shadow, modalContainer, modalWindow, span } = findModalElement();

  shadow.classList.add("shadow_active");
  modalContainer.classList.add("open_modal");
  modalWindow.classList.add("open_modal");
  span.innerHTML = `Hooray! You solved the puzzle in ${time} and ${moves} moves!`;
}
