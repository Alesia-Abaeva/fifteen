export const ButtonSize = (number) => {
  const puzzleSizeContainer = document.querySelector(".puzzle__size");

  for (let i = 0; i < number; i++) {
    const inputSize = document.createElement("input");
    inputSize.classList.add("size__format");
    inputSize.setAttribute("id", `lvl${i + 3}`);
    inputSize.setAttribute("type", `button`);
    inputSize.setAttribute("value", `${i + 3}x${i + 3}`);
    puzzleSizeContainer.appendChild(inputSize);

    if (i === 1) {
      inputSize.classList.add("active-button");
    }
  }
};
