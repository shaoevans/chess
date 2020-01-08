class Piece {
    constructor(position, color, board) {
        this.position = position;
        this.color = color;
        this.board = board;
    }   

    validMoves() {

    }

    isValidPos(pos) {
        return (this.board.grid[pos[0]][pos[1]] !== undefined)
    }

    isNotNullPiece(pos) {
        return (this.board.grid[pos[0]][pos[1]] instanceof NullPiece)
    }

    otherColor() {
        if (this.color === "black") {
            return "white";
        } else {
            return "black";
        }
    }



}

export default Piece