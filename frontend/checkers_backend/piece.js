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


    forwardDir() {
        if (this.color === "black") {
            return 1;
        } else {
            return -1;
        }
    }

    diagonals() {
        const forward = this.forwardDir();
        return this.growUnblockedMovesInDir(forward,1).concat(this.growUnblockedMovesInDir(forward,-1), this.growUnblockedMovesInDir(1,-1), this.growUnblockedMovesInDir(-1,1));
    }

}

export default Piece;