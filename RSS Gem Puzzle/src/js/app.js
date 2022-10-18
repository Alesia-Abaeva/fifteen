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
    // console.log('13131')
    const flatMatrix = matrix.flat()
    const shuffledArray = shuffleaAray(flatMatrix)
    console.log(shuffledArray)
    matrix = getMatrix(shuffledArray)
    setPositionItems(matrix)
}

function shuffleaAray(array){
    return array.map(value => ({value, sort: Math.random()})).sort((a,b) => a.sort - b.sort).map(({value}) => value)
}

// 3. Change position by click


// 4. Change position by keydown

// 4. Show won

// 
// function getMatrix(array){
//     const matrix = [[], [], [], []]
//     let y = 0
//     let x = 0

//     for(let i = 0; i< array.length; i++){
//         if(x >= 4){
//             y++;
//             x=0
//         }

//         matrix[y][x] = array[i]
//         x++
//     }

//     return matrix
// }



// function setNodeStyles(node, x, y){
//     const shiftPs = 100
//     node.style.transform = `translate3D(${x * shiftPs}%, ${y * shiftPs}%, 0)`
// }
