import Piece from "./piece";

class SlidingPiece extends Piece{
    constructor() {

    }

    grow_unblocked_moves_in_dir(dx, dy) {
        const result = [];
        const x = this.position[0];
        const y = this.position[1];
        let current_pos = [x + dx, y + dy];
        while (this.isValidPos(current_pos) && this.isNotNullPiece(current_pos)) {
            result.push(current_pos);
            current_pos = [current_pos[0] + dx, current_pos[1] + dy];
        }
        if (this.isValidPos(current_pos) && this.board.grid[current_pos[0]][current_pos[1]] === this.otherColor()) {
            result.push(current_pos);
        }
        return result;
    }

    horizontals() {
        return this.grow_unblocked_moves_in_dir(1,0).concat(this.grow_unblocked_moves_in_dir(0,1), this.grow_unblocked_moves_in_dir(-1,0), this.grow_unblocked_moves_in_dir(0, -1));
    }

    diagonals() {
        return this.grow_unblocked_moves_in_dir(1,1).concat(this.grow_unblocked_moves_in_dir(-1,-1), this.grow_unblocked_moves_in_dir(1,-1), this.grow_unblocked_moves_in_dir(-1,1));
    }
} 

export default SlidingPiece;
