export const findModalElement = () => {
  const shadow = document.querySelector(".shadow_overlay");
  const modalContainer = document.querySelector(".modal__container");
  const modalWindow = document.querySelector(".modal_window");
  const span = document.querySelector(".text");

  return { shadow, modalContainer, modalWindow, span };
};
