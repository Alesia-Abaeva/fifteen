import { renderChildNode as render } from '../../utils';

export function createModal() {
  const modalContainer = document.createElement('div');
  modalContainer.classList.add('modal__container');
  document.body.appendChild(modalContainer);

  const modalWindow = render('.modal__container', 'div', 'modal_window');
  const modalContent = render('.modal_window', 'div', 'modal_text');
  const span = render('.modal_text', 'span', 'text');
}
