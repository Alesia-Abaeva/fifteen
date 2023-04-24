export function removeNode(node) {
  node.forEach((elem) => {
    elem.parentNode.removeChild(elem);
  });
}
