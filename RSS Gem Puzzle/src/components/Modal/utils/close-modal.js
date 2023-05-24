import { findModalElement } from "./find-elements";

export function closeModal(functionClose) {
  const { shadow, modalContainer, modalWindow, span } = findModalElement();

  shadow.onclick = () => {
    span.innerHTML = " ";
    shadow.classList.remove("shadow_active");
    modalContainer.classList.remove("open_modal");
    modalWindow.classList.remove("open_modal");
    functionClose();
  };
}
