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
  //   console.log(valuesPuzzle);

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

// addValues(16);
