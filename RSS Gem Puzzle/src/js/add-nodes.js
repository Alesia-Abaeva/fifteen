import { getLocalStorage } from "./local-storage";
// import { createElements } from "./rander";

export function addValues(counts) {
  const puzzleContainer = document.querySelector(".puzzle__container");

  let valuesPuzzle = new Array(counts).fill(0).map((item, index) => {
    return index + 1;
  });

  for (let value of valuesPuzzle) {
    const puzzleNumber = document.createElement("button");
    puzzleNumber.classList.add("item");
    puzzleNumber.setAttribute("data-matrix-id", value);
    puzzleNumber.setAttribute("draggable", true);

    puzzleNumber.innerHTML = `<span class="button-border" draggable=true>${value}</span>`;
    puzzleContainer.appendChild(puzzleNumber);
  }
}

export function removeNode(node) {
  console.log(node);

  node.forEach((elem) => {
    elem.parentNode.removeChild(elem);
  });
}

export function addClass(node, clas) {
  node.forEach((elem) => {
    elem.classList.add(clas);
  });
}

export function removeClass(node, clas) {
  node.forEach((elem) => {
    elem.classList.remove(clas);
  });
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
  // containerHeader.classList.add("results_best");
  containerHeader.classList.add("results_header");

  const containerResult = document.createElement("div");
  containerResult.classList.add("results_best");

  puzzleResults.appendChild(containerHeader);
  puzzleResults.appendChild(containerResult);

  const movesHeader = createElements(
    containerHeader,
    "div",
    "result_moves_header",
    "Moves"
  );

  const timeHeader = createElements(
    containerHeader,
    "div",
    "result_time_header",
    "Time"
  );

  const movesNode = createElements(containerResult, "div", "result_moves");
  const timeNode = createElements(containerResult, "div", "result_time");
}

export const createElements = (parentNode, element, style_class, text) => {
  const node = document.createElement(`${element}`);
  style_class && node.classList.add(`${style_class}`);
  parentNode.appendChild(node);
  text && (node.innerHTML = text);

  return node;
};

// const addResultInLocal = () => {
//   const nodeTime = document.querySelector(".result_time");
//   const nodeMoves = document.querySelector(".result_moves");

//   getLocalStorage(LOCAL_STORAGE_KEYS.RESULTS);
// };

// Основные функциональные требования
// Базовый (обязательно):
// ++++++ дизайн должен быть адаптивным, который включает в себя рабочий стол (1280 пикселей <= ширина), планшет (768 пикселей <= ширина < 1280 пикселей) и мобильный телефон (320 пикселей <= ширина < 768 пикселей). При переключении между версиями все должно отображаться корректно, вся функциональность должна присутствовать, ничто не должно исчезать или выходить за пределы экрана. Допустимо изменить внешний вид для мобильной версии (например, скрыть кнопки в меню бургера).
// первоначально тело в index.html файл должен быть пустым, все необходимые элементы генерируются с помощью JS
// +++++ размер рамки по умолчанию составляет 4x4
// +++++ в начальном состоянии игры, рамка заполнена случайно сгенерированными числами, при запуске новой игры числа перетасовываются случайным образом,
// +++++ когда вы нажимаете на плитку рядом с пустой ячейкой, плитка перемещается в пустую ячейку

// Передовой:
// ++++++ игра может быть перезапущена без перезагрузки страницы
// ++++++ отображение продолжительности игры в минутах и секундах "##:##" и количества ходов
// ++++++ реализация функциональности для сохранения игры (например, с помощью localStorage), так что при перезагрузке страницы игрок может продолжить с того места, где он остановился выключен
// ++++++ есть возможность включать / выключать звуковое сопровождение движения плиток
// ++++++ реализована функциональность выбора размера кадра: от 3 × 3 до 8
// 10 лучших результатов сохраняются в таблице рекордов и могут быть просмотрены любым способом (например, нажатием кнопки)
// дополнительные (для получения дополнительных очков):

// плитки можно перетащить в пустую ячейку с помощью мыши
// ++++++ при удачном игровом решении отобразится сообщение: «Ура! Вы решили головоломку за ##:## и N ходов!»
// реализовать анимацию перемещения плиток по полю
// Рекомендуется использовать eslint (eslint-config-airbnb-base), webpack (это требование не проверяется)

// Требования
// к репозиторию работа должна выполняться в репозитории частной школы
// исходный код должен быть зафиксирован в отдельной ветке
// , основная ветка должна быть пустой (содержать только файлы типа README.md или .gitignore)
// сообщения о фиксации должны соответствовать рекомендациям
// после завершения работы создайте запрос на извлечение из ветки разработки для освоения
// имя запроса на извлечение должно содержать имя задачи
// описание запроса на извлечение должно содержать следующую информацию:
// ссылка на задачу
// скриншот вашего приложения (одного будет достаточно)
// ссылка на
// дату завершения вашей заявки / крайний срок
// вашей самопроверки с предварительной оценкой, основанной на критериях оценки из задания
// Технические требования
// приложение проверено в последней версии браузера Google Chrome
// jQuery не разрешен
// вы не можете использовать Angular / React / Vue
// вы можете использовать bootstrap, CSS фреймворки, HTML и CSS препроцессоры
// Критерии для оценки:
// Максимальный балл за задание: 120 баллов

// Базовая область применения +30
// ++++++ верстка, дизайн, адаптивный пользовательский интерфейс: +10
// ++++++ в начальном состоянии игры рамка заполняется случайно сгенерированными и перетасованными числами: +10
// ++++++ при нажатии на плитку рядом с пустой ячейкой плитка перемещается в пустую ячейку: +10

// Расширенные возможности +50
// ++++++ игра может быть перезапущена без перезагрузки страницы: +10
// ++++++ отображаются продолжительность игры и количество ходов: +10
// ++++++ звуковое сопровождение (включение / выключение) перемещения плиток: +10
// ++++++ реализовано сохранение состояния игры и сохранение 10 лучших результатов с помощью localStorage: +10
// ++++++ реализован выбор разных размеров для рамы: +10

// Хакерский прицел +40
//  ++++++ когда игра будет закончена, появится следующее сообщение: "Ура! Вы решили головоломку за ##:## и N ходов!". Так что алгоритм перетасовки должен работать правильно - пользователь может решить головоломку +10
// анимация перемещения плиток по кадру: +15
// плиток можно перетаскивать с помощью мыши: +15
