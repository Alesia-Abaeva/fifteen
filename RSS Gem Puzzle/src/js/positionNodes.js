export function getMatrix(array){
    const matrix = [[], [], [], []]
    let y = 0
    let x = 0

    for(let i = 0; i< array.length; i++){
        if(x >= 4){
            y++;
            x=0
        }

        matrix[y][x] = array[i]
        x++
    }

    return matrix
}

// export  function setPositionItems(matrix){
// for(let y = 0; y < matrix.length; y++){
//     for(let x = 0; x< matrix[y].length; x++){
//         const valueCoordinat = matrix[y][x]
//         const node = itemNodes[valueCoordinat-1]

//         setNodeStyles(node, x, y)
//     }
// }
// }

export function setNodeStyles(node, x, y){
    const shiftPs = 100
    node.style.transform = `translate3D(${x * shiftPs}%, ${y * shiftPs}%, 0)`
}
