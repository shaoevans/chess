
import * as Pieces from "./pieces";


class Board {
    constructor(moveString) {
        // this.setupBoard = this.setupBoard.bind(this);
        this.whitePieces = [];
        this.blackPieces = [];
        this.whiteLostPieces = [];
        this.blackLostPieces = [];
        this.selectPieceToPlace = this.selectPieceToPlace.bind(this);
        this.grid = [];
        this.createBoard();
        // if (moveString) {
        //     this.setupBoard()
        // }
        // this.getPiece = this.getPiece.bind(this);
        // this.createBoard = this.createBoard.bind(this);

    }

    createBoard() {
        for (let i = 0; i < 8; i++) {
            this.grid.push([]);
            for (let j = 0; j < 8; j++) {
                this.grid[i].push(this.selectPieceToPlace(i, j));
            }
        }
    }

    getPieces(color) {
        if (color === "black") {
            return this.blackPieces;
        } else {
            return this.whitePieces;
        }
    }

    // setupBoard() {
    //     return null;
    // }

    getPiece(pos) {
        return this.grid[pos[0]][pos[1]];
    }

    getKing(color) {
        if (color === "black") {
            return this.blackKing;
        } else {
            return this.whiteKing;
        }
    }

    isGameOver(color) {
        if (this.getKing(color).inCheck()) {
            this.isCheckMate(color);
        } else {
            return false;
        }
    }

    isCheckMate(color) {
        const pieces = this.getPieces(color);
        let checkMate = true;
        pieces.forEach(piece => {
            if (piece.validMoves().length) {
            // if (piece && piece.validMoves().length) {
                checkMate = false;
                return;
            }
        })
        return checkMate;
    }



    selectPieceToPlace(i, j) {
        let color;
        let piece;
        if (i < 2) {
            color = "white";
            if (i === 1) {
                // return new Pieces.NullPiece([i,j], this);
                
                piece = new Pieces.Pawn([i, j], this, color);
            } else {
                if (j === 0 || j === 7)  {
                    piece = new Pieces.Rook([i, j], this, color);
                } else if (j === 1 || j === 6) {
                    piece = new Pieces.Knight([i, j], this, color);
                } else if (j === 2 || j === 5) {
                    piece = new Pieces.Bishop([i, j], this, color);
                } else if (j === 3) {
                    piece = new Pieces.King([i, j], this, color);
                    this.whiteKing = piece;
                } else {
                    piece = new Pieces.Queen([i, j], this, color)
                }
            }
            this.whitePieces.push(piece);
        } else if (i < 6) {
            piece = new Pieces.NullPiece([i, j], this)
        } else {
            color = "black";
            if (i === 6) {
                piece = new Pieces.Pawn([i,j ], this, color);
            } else {
                if (j === 0 || j === 7)  {
                    piece = new Pieces.Rook([i, j], this, color);
                } else if (j === 1 || j === 6) {
                    piece = new Pieces.Knight([i, j], this, color);
                } else if (j === 2 || j === 5) {
                    piece = new Pieces.Bishop([i, j], this, color);
                } else if (j === 3) {
                    piece = new Pieces.King([i, j], this, color);
                    this.blackKing = piece;
                } else {
                    piece = new Pieces.Queen([i, j], this, color)
                }
            }
            this.blackPieces.push(piece);
        }
        return piece;
    }

    addLostPiece(color, piece) {
        if (color === "black") {
            this.blackLostPieces.push(this.blackPieces.splice(this.blackPieces.indexOf(piece, 1)));
        } else {
            this.whiteLostPieces.push(this.whitePieces.splice(this.whitePieces.indexOf(piece, 1)));
        }
    }


    willMoveIntoCheck(pos1, pos2) {
        const initialPos = pos1.slice();
        const piece = this.getPiece(pos1);
        const temp = this.getPiece(pos2);
        this.grid[pos2[0]][pos2[1]] = piece;
        piece.position = pos2;
        // Save variables and move piece1 into pos2, duplicating variables in case of array pointer issues
        this.grid[initialPos[0]][initialPos[1]] = new Pieces.NullPiece(initialPos, this);
        const check = this.getKing(piece.color).inCheck();
        // for the new state, check if king of that color is in check
        this.grid[initialPos[0]][initialPos[1]] = piece; 
        piece.position = initialPos;
        this.grid[pos2[0]][pos2[1]] = temp;
        // undo move
        return check;
    }

    movePiece(pos1, pos2) {
        const initialPos = pos1.slice();
        const piece = this.getPiece(pos1);
        const temp = this.getPiece(pos2);
        if (!(temp instanceof Pieces.NullPiece)) {
            this.addLostPiece(temp.color, temp);
        }
        this.grid[pos2[0]][pos2[1]] = piece;
        piece.position = pos2;
        this.grid[initialPos[0]][initialPos[1]] = new Pieces.NullPiece(initialPos, this);

    }

}

export default Board;
