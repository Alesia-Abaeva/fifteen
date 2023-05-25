import { renderChildNode } from '../../../utils';
import { CONFIG } from './const';

export const ButtonSettings = () => {
  const PARENT = '.puzzle__button_container';
  const BTN = 'button';
  const STYLE = 'button__function';

  CONFIG.forEach((el) => {
    renderChildNode(PARENT, BTN, STYLE, el.text, el.id);
  });
};
