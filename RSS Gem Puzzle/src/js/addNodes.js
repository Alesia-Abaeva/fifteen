// console.log(puzzleContainer)
// let number = 16;
// let valuesPuzzle = new Array(number).fill(0).map((_item, index)=>{
//     return index+1
// })

// console.log(valuesPuzzle)

export function addValues(counts) {
  const puzzleContainer = document.querySelector(".puzzle__container");

  let valuesPuzzle = new Array(counts).fill(0).map((item, index) => {
    return index + 1;
  });
    console.log(valuesPuzzle, 'valuesPuzzle');

  for (let value of valuesPuzzle) {
    // console.log(value);
    const puzzleNumber = document.createElement("button");
    puzzleNumber.classList.add("item");
    puzzleNumber.setAttribute('data-matrix-id', value);
    puzzleNumber.innerHTML = `<span class="button-border">${value}</span>`;
    // puzzleNumber.createElement(span);
    puzzleContainer.appendChild(puzzleNumber);

    // puzzleNumber.data-matrix-id = value;

    // console.log(elem + )
    // puzzleNumber.innerText = value;
  }
}

export function removeNode(node){
  // let nodesItem = document.querySelectorAll(`${node}`)
  node.forEach(function (elem) {
    elem.parentNode.removeChild(elem)})
}

export function addClass(node, clas){
  // let nodesItem = document.querySelectorAll(`${node}`)
  node.forEach(function (elem) {
    elem.classList.add(clas)})
}

export function removeClass(node, clas){
  // let nodesItem = document.querySelectorAll(`${node}`)
  node.forEach(function (elem) {
    elem.classList.remove(clas)})
}

// addValues(16);
