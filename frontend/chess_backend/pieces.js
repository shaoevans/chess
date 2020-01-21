import Piece from "./piece";
import React from "react";

export class Queen extends Piece {
    constructor(position, board, color) {
        super(position, board, color)
        this.value = 90;
    }


    getPositionValue() {
        let positionValues;
        if (this.color === "black") {
            positionValues = [
                [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
                [-1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
                [-1.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
                [-0.5,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
                [ 0.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
                [-1.0,  0.5,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
                [-1.0,  0.0,  0.5,  0.0,  0.0,  0.0,  0.0, -1.0],
                [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0]
            ]
        } else {
            positionValues = [
                [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
                [-1.0,  0.0,  0.5,  0.0,  0.0,  0.0,  0.0, -1.0],
                [-1.0,  0.5,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
                [ 0.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
                [-0.5,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
                [-1.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
                [-1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
                [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0]

            ]
        }
        return positionValues[this.position[0]][this.position[1]] * this.value
    }

    moves() {
        return this.horizontals().concat(this.diagonals());
    }

    render() {
        if (this.color === "black") {
            return <i className='black-piece fas fa-chess-queen'></i>
        } else {
            return <i className='white-piece fas fa-chess-queen'></i>
        }
    }

    clone() {
        return new Queen(this.position, this.board, this.color)
    }
}

export class Rook extends Piece {
    constructor(position, board, color) {
        super(position, board, color)
        this.value = 50;
    }

    getPositionValue() {
        let positionValues;
        if (this.color === "black") {
            positionValues = [
                [ 0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
                [ 0.5,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  0.5],
                [-0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
                [-0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
                [-0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
                [-0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
                [-0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
                [ 0.0,  0.0,  0.0,  0.5,  0.5,  0.0,  0.0,  0.0],

            ]
        } else {
            positionValues = [
                [ 0.0,  0.0,  0.0,  0.5,  0.5,  0.0,  0.0,  0.0],
                [-0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
                [-0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
                [-0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
                [-0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
                [-0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
                [ 0.5,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  0.5],
                [ 0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0]
            ]
        }
        return positionValues[this.position[0]][this.position[1]] * this.value
    }

    render() {
        if (this.color === "black") {
            return <i className='black-piece fas fa-chess-rook'></i>
        } else {
            return <i className='white-piece fas fa-chess-rook'></i>
        }
    }

    moves() {
        return this.horizontals();
    }

    clone() {
        return new Rook(this.position, this.board, this.color)
    }
}

export class Bishop extends Piece {
    constructor(position, board, color) {
        super(position, board, color)
        this.value = 30
    }

    getPositionValue() {
        let positionValues;
        if (this.color === "black") {
            positionValues = [
                [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
                [-1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
                [-1.0,  0.0,  0.5,  1.0,  1.0,  0.5,  0.0, -1.0],
                [-1.0,  0.5,  0.5,  1.0,  1.0,  0.5,  0.5, -1.0],
                [-1.0,  0.0,  1.0,  1.0,  1.0,  1.0,  0.0, -1.0],
                [-1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0, -1.0],
                [-1.0,  0.5,  0.0,  0.0,  0.0,  0.0,  0.5, -1.0],
                [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0]
            ]
        } else {
            positionValues = [
                [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
                [-1.0,  0.5,  0.0,  0.0,  0.0,  0.0,  0.5, -1.0],
                [-1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0, -1.0],
                [-1.0,  0.0,  1.0,  1.0,  1.0,  1.0,  0.0, -1.0],
                [-1.0,  0.5,  0.5,  1.0,  1.0,  0.5,  0.5, -1.0],
                [-1.0,  0.0,  0.5,  1.0,  1.0,  0.5,  0.0, -1.0],
                [-1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
                [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0]

            ]
        }
        return positionValues[this.position[0]][this.position[1]] * this.value
    }

    render() {
        if (this.color === "black") {
            return <i className='black-piece fas fa-chess-bishop'></i>
        } else {
            return <i className='white-piece fas fa-chess-bishop'></i>
        }
    }

    moves() {
        return this.diagonals();
    }

    clone() {
        return new Bishop(this.position, this.board, this.color)
    }
}

export class Knight extends Piece {
    constructor(position, board, color) {
        super(position, board, color)
        this.value = 30
    }


    getPositionValue() {
        let positionValues;
        if (this.color === "black") {
            positionValues = [
                [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
                [-4.0, -2.0,  0.0,  0.0,  0.0,  0.0, -2.0, -4.0],
                [-3.0,  0.0,  1.0,  1.5, -1.5,  1.0,  0.0, -3.0],
                [-3.0,  0.5,  1.5,  2.0,  2.0,  1.5,  0.5, -3.0],
                [-3.0,  0.0,  1.5,  2.0,  2.0,  1.5,  0.0, -3.0],
                [-3.0,  0.5,  1.5,  2.0,  2.0,  1.5,  0.5, -3.0],
                [-4.0, -2.0,  0.0,  0.0,  0.0,  0.0, -2.0, -4.0],
                [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
            ]
        } else {
            positionValues = [
                [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
                [-4.0, -2.0,  0.0,  0.0,  0.0,  0.0, -2.0, -4.0],
                [-3.0,  0.5,  1.5,  2.0,  2.0,  1.5,  0.5, -3.0],
                [-3.0,  0.0,  1.5,  2.0,  2.0,  1.5,  0.0, -3.0],
                [-3.0,  0.5,  1.5,  2.0,  2.0,  1.5,  0.5, -3.0],
                [-3.0,  0.0,  1.0,  1.5, -1.5,  1.0,  0.0, -3.0],
                [-4.0, -2.0,  0.0,  0.0,  0.0,  0.0, -2.0, -4.0],
                [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0]
            ]
        }
        return positionValues[this.position[0]][this.position[1]] * this.value
    }

    moveDirsArr() {
        return [
            [2, 1],
            [2, -1],
            [-2, 1],
            [-2, -1],
            [1, 2],
            [1, -2],
            [-1, 2],
            [-1, -2]
        ]
    }

    render() {
        if (this.color === "black") {
            return <i className='black-piece fas fa-chess-knight'></i>
        } else {
            return <i className='white-piece fas fa-chess-knight'></i>
        }
    }

    moves() {
        return this.steppableMoves(this.moveDirsArr())
    }

    clone() {
        return new Knight(this.position, this.board, this.color)
    }

}

export class King extends Piece {
    constructor(position, board, color) {
        super(position, board, color)
        this.value = 900;
    }

    getPositionValue() {
        let positionValues;
        if (this.color === "black") {
            positionValues = [
                [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
                [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
                [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
                [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
                [-2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
                [-1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
                [ 2.0,  2.0,  0.0,  0.0,  0.0,  0.0,  2.0,  2.0],
                [ 2.0,  3.0,  1.0,  0.0,  0.0,  1.0,  3.0,  2.0]
            ]
        } else {
            positionValues = [
                [ 2.0,  3.0,  1.0,  0.0,  0.0,  1.0,  3.0,  2.0],
                [ 2.0,  2.0,  0.0,  0.0,  0.0,  0.0,  2.0,  2.0],
                [-1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
                [-2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
                [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
                [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
                [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
                [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0]
            ]
        }
        return positionValues[this.position[0]][this.position[1]] * this.value
    }

    forwardDir() {
        if (this.color === "black") {
            return -1;
        } else {
            return 1;
        }
    }

    inCheck() {
        const diag1 = this.growUnblockedMovesInDir(1, 1);
        const diag2 = this.growUnblockedMovesInDir(1, -1);
        const diag3 = this.growUnblockedMovesInDir(-1, -1);
        const diag4 = this.growUnblockedMovesInDir(1, 1);
        const diagonals = [
            diag1[diag1.length-1],
            diag2[diag2.length-1],
            diag3[diag3.length-1],
            diag4[diag4.length-1]
        ];
        for (let i = 0; i < diagonals.length; i++) {
            if (diagonals[i]) {
                const checkPiece = this.board.getPiece(diagonals[i]);
                if ((checkPiece instanceof Bishop || checkPiece instanceof Queen) && checkPiece.color === this.otherColor()) {
                    return true;
                }
            }
        }
   
        const horiz1 = this.growUnblockedMovesInDir(-1, 0);
        const horiz2 = this.growUnblockedMovesInDir(0, -1);
        const horiz3 = this.growUnblockedMovesInDir(0, 1);
        const horiz4 = this.growUnblockedMovesInDir(1, 0);
        const horizontals = [
            horiz1[horiz1.length-1],
            horiz2[horiz2.length-1],
            horiz3[horiz3.length-1],
            horiz4[horiz4.length-1]
        ]
        for (let i = 0; i < horizontals.length; i++) {
            if (horizontals[i]) {
                const checkPiece = this.board.getPiece(horizontals[i])
                if ((checkPiece instanceof Queen || checkPiece instanceof Rook) && checkPiece.color === this.otherColor()) {
                    return true;
                }
            }
        }

        const knights = this.steppableMoves(this.knightMoveDirsArr());
        for (let i = 0; i < knights.length; i++) {
            const checkPiece = this.board.getPiece(knights[i]);
            if (checkPiece instanceof Knight && checkPiece.color === this.otherColor()) {
                return true;
            }
        }
 
        const x = this.position[0];
        const y = this.position[1];
        const forward = this.forwardDir();
        const pawns = [[x + forward, y + 1], [x + forward, y - 1]];
        for (let i = 0; i < pawns.length; i++) {
            const checkPiece = this.board.getPiece(pawns[i]);
            if (checkPiece instanceof Pawn && checkPiece.color === this.otherColor()) {
                return true;
            }
        }
 
        return false;
    }

    moveDirsArr() {
        return [
            [0, 1],
            [0, -1],
            [1, 0],
            [-1, 0],
            [1, 1],
            [1, -1],
            [-1, 1],
            [-1, -1]
        ]
    }

    knightMoveDirsArr() {
        return [
            [2, 1],
            [2, -1],
            [-2, 1],
            [-2, -1],
            [1, 2],
            [1, -2],
            [-1, 2],
            [-1, -2]
        ]
        
    }

    render() {
        if (this.color === "black") {
            return <i className='black-piece fas fa-chess-king'></i>
        } else {
            return <i className='white-piece fas fa-chess-king'></i>
        }
    }

    moves() {
        return this.steppableMoves(this.moveDirsArr())
    }

    clone() {
        return new King(this.position, this.board, this.color)
    }


}

export class Pawn extends Piece{
    constructor(position, board, color) {
        super(position, board, color)
        this.value = 10;
    }

    atStartRow() {
        if (this.color === "black") {
            return (this.position[0] === 6);
        } else {
            return (this.position[0] === 1);
        }
    }

    forwardDir() {
        if (this.color === "black") {
            return -1;
        } else {
            return 1;
        }
    }

    getPositionValue() {
        let positionValues;
        if (this.color === "black") {
            positionValues = [
                [ 0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
                [ 5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0],
                [ 1.0,  1.0,  2.0,  3.0,  3.0,  2.0,  1.0,  1.0],
                [ 0.5,  0.5,  1.0,  2.5,  2.5,  1.0,  0.5,  0.5],
                [ 0.0,  0.0,  0.0,  2.0,  2.0,  0.0,  0.0,  0.0],
                [ 0.5, -0.5, -1.0,  0.0,  0.0, -1.0, -0.5,  0.5],
                [ 0.5,  1.0,  1.0, -2.0, -2.0,  1.0,  1.0,  0.5],
                [ 0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0]
            ]
        } else {
            positionValues = [
                [ 0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
                [ 0.5,  1.0,  1.0, -2.0, -2.0,  1.0,  1.0,  0.5],
                [ 0.5, -0.5, -1.0,  0.0,  0.0, -1.0, -0.5,  0.5],
                [ 0.0,  0.0,  0.0,  2.0,  2.0,  0.0,  0.0,  0.0],
                [ 0.5,  0.5,  1.0,  2.5,  2.5,  1.0,  0.5,  0.5],
                [ 1.0,  1.0,  2.0,  3.0,  3.0,  2.0,  1.0,  1.0],
                [ 5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0],
                [ 0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
            ]
        }
        return positionValues[this.position[0]][this.position[1]] * this.value
    }


    forwardSteps() {
        const x = this.position[0];
        const y = this.position[1];
        const forward = this.forwardDir();
        if (!(this.board.getPiece([x + forward, y]) instanceof NullPiece)) {
            return [];
        } else if (this.atStartRow() && (this.board.getPiece([x + forward + forward, y]) instanceof NullPiece)) {
            return [[x + forward, y],[x + forward + forward, y]];
        } else {
            return [[x + forward, y]]
        }
    }

    sideAttacks() {
        const x = this.position[0];
        const y = this.position[1];
        const forward = this.forwardDir();
        let result = [];
        if (this.board.getPiece([x + forward, y + 1]) && this.board.getPiece([x + forward, y + 1]).color === this.otherColor()) {
            result.push([x + forward, y + 1]);
        }
        if (this.board.getPiece([x + forward, y - 1]) && this.board.getPiece([x + forward, y - 1]).color === this.otherColor()) {
            result.push([x + forward, y - 1]);
        }
        return result;
    }

    render() {
        if (this.color === "black") {
            return <i className='black-piece fas fa-chess-pawn'></i>
        } else {
            return <i className='white-piece fas fa-chess-pawn'></i>
        }
    }

    moves() {
        return this.forwardSteps().concat(this.sideAttacks());
    }

    clone() {
        return new Pawn(this.position, this.board, this.color)
    }

}

export class NullPiece extends Piece{
    constructor(position, board) {
        super(position, board, null)
        this.value = 0;
    }

    render() {
        return null;
    }

    clone() {
        return new NullPiece(this.position, this.board, this.color)
    }
}

