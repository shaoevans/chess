import Piece from "./piece";
import NullPiece from "./null_piece";
import King from "./king";

class Board {
    constructor(moveString = "") {
        this.redPieces = [];
        this.blackPieces = [];
        this.grid = [];
        this.moveString = moveString;
        this.createBoard();
        if (this.moveString.length) {
            this.setupBoard();
        }
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
        let piece;
        if ((i === 0 && j % 2 === 0) || (i === 1 && j % 2 !== 0) || (i === 2 && j % 2 === 0)) {
            piece = new Piece([i, j], this, "black")
            this.blackPieces.push(piece);
        } else if ((i === 5 && j % 2 !== 0) || (i === 6 && j % 2 === 0) || (i === 7 && j % 2 !== 0)) {
            piece = new Piece([i, j], this, "red")
            this.redPieces.push(piece);
        } else {
            piece = new NullPiece([i, j], this)
        }
        return piece;
    }

    getPiece(pos) {
        return this.grid[pos[0]][pos[1]];
    }
    
    movePiece(pos1, pos2) {
        const initialPos = pos1.slice();
        const piece = this.getPiece(pos1);
        const temp = this.getPiece(pos2);
        // if (!(temp instanceof NullPiece)) {
        //     this.addLostPiece(temp);
        // }
        this.grid[pos2[0]][pos2[1]] = piece;
        piece.position = pos2;
        this.grid[initialPos[0]][initialPos[1]] = new NullPiece(initialPos, this);
    }
}

export default Board;