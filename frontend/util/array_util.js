

export const isMoveInValidMoves = (validMoves, move) => {
    const moveAsString = JSON.stringify(move);
    let returnValue = false;
    validMoves.some(ele => {
        if (JSON.stringify(ele) === moveAsString) {
            returnValue = true;
        }
    })
    return returnValue;
}