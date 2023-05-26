import { createElements } from '../../utils/create-element';

export function Results() {
  const puzzleResults = document.querySelector('.puzzle__results');
  const resultButton = document.createElement('button');

  resultButton.classList.add('button__function');
  resultButton.classList.add('result_button');
  resultButton.setAttribute('id', 'results');
  resultButton.innerText = 'Results';
  puzzleResults.appendChild(resultButton);

  const containerHeader = document.createElement('div');
  containerHeader.classList.add('results_header');

  const containerResult = document.createElement('div');
  containerResult.classList.add('results_best');

  puzzleResults.appendChild(containerHeader);
  puzzleResults.appendChild(containerResult);

  const movesHeader = createElements(containerHeader, 'div', 'result_moves_header', 'Moves');

  const timeHeader = createElements(containerHeader, 'div', 'result_time_header', 'Time');

  const movesNode = createElements(containerResult, 'div', 'result_moves');
  const timeNode = createElements(containerResult, 'div', 'result_time');
}
