import { values } from "lodash";
import "../style/style.scss";
import { addValues } from "./addNodes";
import { getMatrix, setNodeStyles} from "./positionNodes";
let countItem = 16;

addValues(countItem);

const container = document.getElementById("conteiner_item");
const itemNodes = Array.from(document.querySelectorAll(".item"));


// 1. Position
itemNodes[countItem -1].style.display = 'none'
// 1.2 - create matrix
let matrix = getMatrix(itemNodes.map((items)=> Number(items.dataset.matrixId)))
// console.log(matrix)
setPositionItems(matrix)

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
    const flatMatrix = matrix.flat()
    const shuffledArray = shuffleaAray(flatMatrix)
    matrix = getMatrix(shuffledArray)
    setPositionItems(matrix)
}

function shuffleaAray(array){
    return array.map(value => ({value, sort: Math.random()})).sort((a,b) => a.sort - b.sort).map(({value}) => value)
}

// 3. Change position by click

const blankNumber = 16

container.addEventListener('click', (event)=>{
    const buttonNode = event.target.closest('button')
  
    if(!buttonNode){
        return
    }

    const buttonNumber = Number(buttonNode.dataset.matrixId)
    // console.log(buttonNumber)
    const buttonCoords = findCoordinatesByNumber(buttonNumber, matrix)
    const  blankCoords =findCoordinatesByNumber(blankNumber, matrix)
    const isValide = isValidForSwap(buttonCoords, blankCoords)

    if(isValide){
        swap(blankCoords, buttonCoords, matrix),
        setPositionItems(matrix)
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

}


// 4. Change position by keydown

// 4. Show won




