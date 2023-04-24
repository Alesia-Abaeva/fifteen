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

export function addResults() {
  const puzzleResults = document.querySelector(".puzzle__results");
  const resultButton = document.createElement("button");

  resultButton.classList.add("button__function");
  resultButton.classList.add("result_button");
  resultButton.setAttribute("id", "results");
  resultButton.innerText = "Results";
  puzzleResults.appendChild(resultButton);

  const containerHeader = document.createElement("div");
  containerHeader.classList.add("results_header");

  const containerResult = document.createElement("div");
  containerResult.classList.add("results_best");

  puzzleResults.appendChild(containerHeader);
  puzzleResults.appendChild(containerResult);
}
