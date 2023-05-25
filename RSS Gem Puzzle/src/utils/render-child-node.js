export const renderChildNode = (parent, node, name, text, id) => {
  const parentHeader = document.querySelector(`${parent}`);
  const nodeElement = document.createElement(`${node}`);

  id && nodeElement.setAttribute('id', id);
  text && (nodeElement.innerHTML = text);
  name && nodeElement.classList.add(`${name}`);

  parentHeader.appendChild(nodeElement);

  return nodeElement;
};
