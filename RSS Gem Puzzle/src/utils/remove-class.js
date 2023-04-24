export function removeClass(node, styleName) {
  node.forEach((elem) => {
    elem.classList.remove(styleName);
  });
}
