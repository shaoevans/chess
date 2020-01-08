import SlidingPiece from "./sliding_piece";
import SteppingPiece from "./stepping_piece";

export class Queen extends SlidingPiece {
    constructor() {

    }

    moves() {
        return this.horizontals().concat(this.diagonals());
    }
}

export class Rook extends SlidingPiece {
    constructor() {

    }

    moves() {
        return this.horizontals();
    }
}

export class Bishop extends SlidingPiece {
    constructor() {

    }

    moves() {
        return this.diagonals();
    }
}

export class Knight extends SteppingPiece {

}

export class King extends SteppingPiece {

}

export class Pawn {

}

export class NullPiece {

}

