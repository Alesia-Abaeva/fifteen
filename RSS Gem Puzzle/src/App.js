import { ButtonSettings } from './components/Button/BSettings/Settings';
import { ButtonSize } from './components/Button/BSize/Size';
import { InformationContainer } from './components/Information/Information';
import { createModal } from './components/Modal/Modal';
import { renderChildNode } from './utils';

export const renderApp = () => {
  const PARENT = '.puzzle__wrapper';

  const shadow = document.createElement('div');
  shadow.setAttribute('id', 'shadow_overlay');
  shadow.classList.add('shadow_overlay');

  document.body.appendChild(shadow);

  createModal();

  const puzzleWrapper = document.createElement('div');
  puzzleWrapper.classList.add('puzzle__wrapper');
  document.body.appendChild(puzzleWrapper);

  renderChildNode(PARENT, 'h1', 'puzzle__title', 'RSS Gem Puzzle');
  renderChildNode(PARENT, 'div', 'puzzle__button_container');

  ButtonSettings(); //

  renderChildNode(PARENT, 'div', 'puzzle__information');

  InformationContainer();

  renderChildNode(PARENT, 'div', 'puzzle__container', ' ', 'conteiner_item');

  renderChildNode(PARENT, 'div', 'puzzle__size');

  ButtonSize(6); //

  renderChildNode('.puzzle__wrapper', 'div', 'puzzle__results');
};
