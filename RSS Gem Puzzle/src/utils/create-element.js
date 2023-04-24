export const createElements = (parentNode, element, styleName, text) => {
  const node = document.createElement(`${element}`);
  styleName && node.classList.add(`${styleName}`);
  parentNode.appendChild(node);
  text && (node.innerHTML = text);

  return node;
};
