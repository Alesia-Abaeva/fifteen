export function addValues(counts) {
  const puzzleContainer = document.querySelector(".puzzle__container");

  let valuesPuzzle = new Array(counts).fill(0).map((_, index) => {
    return index + 1;
  });

  for (let value of valuesPuzzle) {
    const puzzleNumber = document.createElement("button");
    puzzleNumber.classList.add("item");
    puzzleNumber.setAttribute("data-matrix-id", value);
    puzzleNumber.setAttribute("draggable", true);

    puzzleNumber.innerHTML = `<span class="button-border">${value}</span>`;
    puzzleContainer.appendChild(puzzleNumber);
  }
}
