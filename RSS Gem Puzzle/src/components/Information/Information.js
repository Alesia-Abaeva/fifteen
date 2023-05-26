import { createElements, renderChildNode } from '../../utils';

const renderInfoWrap = (node, text, value, className) => {
  createElements(node, 'p', 'paragraf', text);
  createElements(node, 'span', className, value);
};

export const InformationContainer = () => {
  const moves = renderChildNode('.puzzle__information', 'div', 'inform__moves');
  const time = renderChildNode('.puzzle__information', 'div', 'inform__times');
  renderInfoWrap(moves, 'Move', 0, 'count');
  renderInfoWrap(time, 'Time', '0:00', 'timer');
};
