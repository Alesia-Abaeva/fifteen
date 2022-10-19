// import { values } from "lodash";
import "../style/style.scss";
import { addValues, removeNode, addClass, removeClass} from "./addNodes";
import { getMatrix, setNodeStyles} from "./positionNodes";

let countItem = 16;
let itemLineNumber = Math.sqrt (countItem)
let shablonMatrix
let winArray = new Array(countItem).fill(0).map((item, i) => i+1)
// removeNode

addValues(countItem);
const size9 = document.getElementById('lvl3')
const size16 = document.getElementById('lvl4')
const size25 = document.getElementById('lvl5')
const size36 = document.getElementById('lvl6')
const size49 = document.getElementById('lvl7')
const size64 = document.getElementById('lvl8')
const container = document.getElementById("conteiner_item");
let itemNodes = Array.from(document.querySelectorAll(".item"));
const sizeButton = Array.from(document.querySelectorAll(".size__format"));
// counts
const machCount = document.querySelector('.count')
let counts = 0
// time
const timerPuzzle = document.querySelector(".timer")
const stopButton = document.getElementById('stop')
let timeOut
let seconds = 0;
let minutes = 0;
let time;
let clockTick;
let firstClick = false;
let clickTime = 0

// 1. Position
itemNodes[countItem -1].style.display = 'none'
// 1.2 - create matrix
let matrix = getMatrix(itemNodes.map((items)=> Number(items.dataset.matrixId)) )
// console.log(matrix)
setPositionItems(matrix)
// initGame(matrix)



size9.onclick = () => {
    removeClass(sizeButton, 'active-button')
    size9.classList.add('active-button')
    changeSize(9, [[], [], []], 'size9')
}

size16.onclick = () => {
    removeClass(sizeButton, 'active-button')
    size16.classList.add('active-button')
    changeSize(16, [[], [], [], []], 'size16')
}

size25.onclick = () => {
    removeClass(sizeButton, 'active-button')
    size25.classList.add('active-button')
    changeSize(25, [[], [], [], [],[]], 'size25')
}

size36.onclick = () => {
    removeClass(sizeButton, 'active-button')
    size36.classList.add('active-button')
    changeSize(36, [[], [], [], [], [],[]], 'size36')
}

size49.onclick = () => {
    removeClass(sizeButton, 'active-button')
    size49.classList.add('active-button')
    changeSize(49, [[], [], [], [], [],[], []], 'size49')
}

size64.onclick = () => {
    removeClass(sizeButton, 'active-button')
    size64.classList.add('active-button')
    changeSize(64, [[], [], [], [], [],[], [], []], 'size64')
}






function setPositionItems(matrix){
    for(let y = 0; y < matrix.length; y++){
        for(let x = 0; x< matrix[y].length; x++){
            const valueCoordinat = matrix[y][x]
            const node = itemNodes[valueCoordinat-1]
    
            setNodeStyles(node, x, y)
        }
    }
}


// 2. Shaffle
const shuffleButton = document.getElementById('shuffle')

shuffleButton.onclick = () => {
    console.log(matrix, 'matrix')
    const flatMatrix = matrix.flat()
    console.log(flatMatrix)
    const shuffledArray = shuffleaAray(flatMatrix)
    console.log(shuffledArray)
    matrix = getMatrix(shuffledArray, shablonMatrix, itemLineNumber) 
    setPositionItems(matrix)
    resetCounter() 
}

function shuffleaAray(array){
    return array.map(value => ({value, sort: Math.random()})).sort((a,b) => a.sort - b.sort).map(({value}) => value)
}

// 3. Change position by click

let blankNumber = countItem

container.addEventListener('click', (event)=>{
    const buttonNode = event.target.closest('button')
    
  
    if(!buttonNode){
        return
    }

    const buttonNumber = Number(buttonNode.dataset.matrixId)
    const buttonCoords = findCoordinatesByNumber(buttonNumber, matrix)
    const blankCoords = findCoordinatesByNumber(blankNumber, matrix)
    const isValide = isValidForSwap(buttonCoords, blankCoords)
    // let click = 0
    if(isValide){
        counts += 1; //add
        machCount.innerHTML = `${counts}`; //add
        swap(blankCoords, buttonCoords, matrix),
        setPositionItems(matrix)  
        
        clickTime ++
        if(clickTime  ==1){
            firstClick = true;
            if (firstClick == true) {
              clockTick = setInterval(startTime, 1000);
            }
          } else if (clickTime  > 1) {
            firstClick = false;
          
        }

    }
    console.log(isValide)
})


function findCoordinatesByNumber(number, matrix){
    for(let y = 0; y < matrix.length; y++){
        for(let x = 0; x< matrix[y].length; x++){
            if(matrix[y][x] === number){
                 return {x, y}
            }
        }
    }
    return null
}

function isValidForSwap(coorder1, coorder2){
    const differentX = Math.abs(coorder1.x - coorder2.x)
    const differentY = Math.abs(coorder1.y - coorder2.y)

    return (differentX === 1 || differentY === 1) && (coorder1.x === coorder2.x || coorder1.y === coorder2.y)

}

function swap(coorder1, coorder2, matrix){
    const coords1Number = matrix[coorder1.y][coorder1.x]
    matrix[coorder1.y][coorder1.x] = matrix[coorder2.y][coorder2.x]
    matrix[coorder2.y][coorder2.x] = coords1Number
    // const coords2Number = matrix[coorder1.y][coorder1.x]

    if(isWon(matrix)){
        addWonClass()
        stopTime()
    }

}

// let winArray = new Array(countItem).fill(0).map((item, i) => i+1)
console.log(winArray, 'winArray')
function isWon(matrix){
    const flatMatrix = matrix.flat()
    for(let i = 0; i< winArray.length; i++){
        if(flatMatrix[i] !== winArray[i]){
            return false
        }
    }
    return true
}

const wonClass = 'puzzle__won'
function addWonClass(){
    setTimeout(()=> {
        container.classList.add(wonClass)
        alert("You Win!")

        setTimeout(()=>{
            container.classList.remove(wonClass)

        }, 1000)

    }, 100)
}
// TODO - добавить сюда  when the game is finished, the following message is displayed "Hooray! You solved the puzzle in ##:## and N moves!". So that shuffled algorithm should work correctly - user can solve puzzle +10


// 4. Change position by keydown
// window.addEventListener('keydown', (event) => {
//     if(!event.key.includes('Arrow')){
//         return
//     }
//     // const buttonCoords = findCoordinatesByNumber(buttonNumber, matrix)
//     const  blankCoords = findCoordinatesByNumber(blankNumber, matrix)
//    const buttonCoords = {
//     x: blankCoords.x,
//     y: blankCoords.y,
//    }
//    const direction = event.key.split('Arrow')[1].toLowerCase()
//    const maxIndexMatrix = matrix.length
// // console.log(direction)
// // console.log(buttonCoords.x)
//    switch(direction){
//     case 'up':
//         buttonCoords.y +=1
//         break;
//     case 'down':
//         buttonCoords.y -=1
//         break;
//     case 'left':
//         buttonCoords.x += 1
//         break;
//     case 'rigth':
//         buttonCoords.x -= 1
//         break;
//    }
// // console.log(direction)
// console.log(buttonCoords.x)



//    if(buttonCoords.y >= maxIndexMatrix || buttonCoords.y < 0 || buttonCoords.x >= maxIndexMatrix || buttonCoords.x < 0 ) {
//     return
//    }
//    swap(blankCoords, buttonCoords, matrix),
//    setPositionItems(matrix)
// })


// 4. Change size
 function changeSize(number, matrixShablon, newStyle){
    let numberLine = Math.sqrt (number)
    countItem = number
    blankNumber = number
    itemLineNumber = numberLine
    shablonMatrix = matrixShablon
    winArray = new Array(countItem).fill(0).map((item, i) => i+1)
  
    removeNode(itemNodes)
  
    addValues(number)
    itemNodes = Array.from(document.querySelectorAll(".item"))
  
    itemNodes[countItem -1].style.display = 'none'
    addClass(itemNodes, `${newStyle}` )
    matrix = getMatrix(itemNodes.map((items)=> Number(items.dataset.matrixId)) , matrixShablon, numberLine)
    setPositionItems(matrix)
  
    return matrix
  }

// 5. Time

function startTime() {
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
  
    time = minutes + ":" + seconds;
    seconds++;
    if (seconds > 60) {
      seconds = 0;
      minutes++;
    }
  
    timerPuzzle.innerText = time;
  }

  //start timer on first click
  function startTimer() {
    let click = 0;
    itemNodes.forEach(function(card) {
      card.addEventListener("click", function() {
        click++;
        if (click == 1) {
          firstClick = true;
          if (firstClick == true) {
            clockTick = setInterval(startTime, 1000);
          }
        } else if (click > 1) {
          firstClick = false;
        }
      });
    });
  }
  
  // stop timer for game
  function stopTime() {
    let finalTime = time;
    clearInterval(clockTick);
  
    clickTime  = 0;
  }
  

// 6. Try
// const machCount = document.querySelector('.count')
// let counts = 0

function resetCounter() {
    counts = 0; //add
    machCount.innerHTML = `${counts}`;
  }


// ---------------------------------------------------------------------------
// 
// ---------------------------------------------------------------------------





// container.classList.add('.')
// itemNodes  чтобы изменить им стиль, нужно пробежаться массивом по всем нодам
// console.log(itemNodes)








