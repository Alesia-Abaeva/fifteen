export function addClass(node, styleName) {
  node.forEach((elem) => {
    elem.classList.add(styleName);
  });
}
