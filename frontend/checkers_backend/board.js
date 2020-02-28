import Piece from "./piece";
import NullPiece from "./null_piece";

class Board {
    constructor() {
        this.redPieces = [];
        this.blackPieces = [];
        this.grid = [];
        this.createBoard();
    }
    createBoard() {
        for (let i = 0; i < 8; i++) {
            this.grid.push([]);
            for (let j = 0; j < 8; j++) {
                this.grid[i].push(this.selectPieceToPlace(i, j));
            }
        }
    }

    selectPieceToPlace(i , j) {
        if (i <= 1) {
            return new Piece([i, j], this, "black")
        } else if (i >= 6) {
            return new Piece([i, j], this, "red")
        } else {
            return new NullPiece([i, j], this)
        }
    }
}

export default Board;