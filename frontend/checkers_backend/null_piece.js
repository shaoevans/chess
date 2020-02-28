import Piece from "./piece";

class NullPiece extends Piece {
    constructor(position, board) {
        super(position, board, null)
    }

    render() {
        return null;
    }
}

export default NullPiece;