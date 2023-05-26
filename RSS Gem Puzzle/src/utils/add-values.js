export function addValues(counts) {
  const puzzleContainer = document.querySelector('.puzzle__container');

  const valuesPuzzle = new Array(counts).fill(0).map((_, index) => {
    return index + 1;
  });

  valuesPuzzle.forEach((value) => {
    const puzzleNumber = document.createElement('button');
    puzzleNumber.classList.add('item');
    puzzleNumber.setAttribute('data-matrix-id', value);
    puzzleNumber.setAttribute('draggable', true);

    puzzleNumber.innerHTML = `<span class="button-border">${value}</span>`;
    puzzleContainer.appendChild(puzzleNumber);
  });
}
