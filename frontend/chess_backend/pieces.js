import Piece from "./piece";
import React from "react";

export class Queen extends Piece {
    constructor(position, board, color) {
        super(position, board, color)
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
}

export class Rook extends Piece {
    constructor(position, board, color) {
        super(position, board, color)
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
}

export class Bishop extends Piece {
    constructor(position, board, color) {
        super(position, board, color)
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
}

export class Knight extends Piece {
    constructor(position, board, color) {
        super(position, board, color)
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

}

export class King extends Piece {
    constructor(position, board, color) {
        super(position, board, color)
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
        diagonals.forEach(diagPos => {
            if (diagPos) {
                const checkPiece = this.board.getPiece(diagPos);
                if (checkPiece instanceof Bishop || checkPiece instanceof Queen) {
                    return true;
                }
            }
        })
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
        horizontals.forEach(horizPos => {
            if (horizPos) {
                const checkPiece = this.board.getPiece(horizPos);
                if (checkPiece instanceof Queen || checkPiece instanceof Rook) {
                    return true;
                }
            }
        })
        const knights = this.steppableMoves(this.knightMoveDirsArr());
        knights.forEach(knightPos => {
            const checkPiece = this.board.getPiece(knightPos);
            if (checkPiece instanceof Knight) {
                return true;
            }
        });
        const x = this.position[0];
        const y = this.position[1];
        const forward = this.forwardDir();
        const pawns = [[x + forward, y + 1], [x + forward, y - 1]];
        pawns.forEach(pawnPos => {
            const checkPiece = this.board.getPiece(pawnPos);
            if (checkPiece instanceof Pawn) {
                return true;
            }
        })
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


}

export class Pawn extends Piece{
    constructor(position, board, color) {
        super(position, board, color)
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

    forwardSteps() {
        const x = this.position[0];
        const y = this.position[1];
        const forward = this.forwardDir();
        if (this.atStartRow()) {
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

}

export class NullPiece extends Piece{
    constructor(position, board) {
        super(position, board, null)
    }

    render() {
        return null;
    }
}

// if king is in check, then check for checkmate

// checkmate is when no pieces of the color being checked have any valid moves
// else just check valid moves for other pieces