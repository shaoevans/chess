

class Piece {
    constructor(position, board, color) {
        this.position = position;
        this.board = board;
        this.color = color;
    }   

    isValidPos(pos) {
        return !(
            (pos[0] < 0) ||
            (pos[0] > 7) ||
            (pos[1] < 0) ||
            (pos[1] > 7)
        )
    }

    isNullPiece() {
        return (this.color === null)
    }

    otherColor() {
        if (this.color === "black") {
            return "white";
        } else {
            return "black";
        }
    }



    validMoves() {
        return this.moves().filter(move => {
            return !this.board.willMoveIntoCheck(this.position, move)
        })
    }

    growUnblockedMovesInDir(dx, dy) {
        const result = [];
        const x = this.position[0];
        const y = this.position[1];
        let currentPos = [x + dx, y + dy];
        while (this.isValidPos(currentPos) && this.board.getPiece(currentPos).isNullPiece()) {
            result.push(currentPos);
            currentPos = [currentPos[0] + dx, currentPos[1] + dy];
        }
        if (this.isValidPos(currentPos) && this.board.getPiece(currentPos).color === this.otherColor()) {
            result.push(currentPos);
        }
        return result;
    }

    horizontals() {
        return this.growUnblockedMovesInDir(1,0).concat(this.growUnblockedMovesInDir(0,1), this.growUnblockedMovesInDir(-1,0), this.growUnblockedMovesInDir(0, -1));
    }

    diagonals() {
        return this.growUnblockedMovesInDir(1,1).concat(this.growUnblockedMovesInDir(-1,-1), this.growUnblockedMovesInDir(1,-1), this.growUnblockedMovesInDir(-1,1));
    }

    steppableMoves(moveDirsArr) {
        const result = [];
        moveDirsArr.forEach(moveDir => {
            const x = this.position[0];
            const y = this.position[1];
            const currentPos = [x + moveDir[0], y + moveDir[1]];
            if (this.isValidPos(currentPos) && (this.board.getPiece(currentPos).isNullPiece() || this.board.getPiece(currentPos).color === this.otherColor())) {
                result.push(currentPos)
            } 
        })
        return result;
    }


}

export default Piece