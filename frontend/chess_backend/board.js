
import * as Pieces from "./pieces";


class Board {
    constructor(moveString) {
        this.whitePieces = [];
        this.blackPieces = [];
        this.whiteLostPieces = [];
        this.blackLostPieces = [];
        this.selectPieceToPlace = this.selectPieceToPlace.bind(this);
        this.grid = [];
        this.turn = ["black", "white"]
        this.createBoard();
        if (moveString) {
            this.moveString === moveString;
            this.setupBoard(moveString);
        } else {
            this.moveString === ""
        }
    }

    convertLettersToNumbers() {
        return {
            A: 7,
            B: 6,
            C: 5,
            D: 4,
            E: 3,
            F: 2,
            G: 1,
            H: 0
        }
    } 
    
    setupBoard(moveString) {
        if (moveString === "") {
            return;
        }
        const moveArr = moveString.split(" ");
        moveArr.forEach(move => {
            const movesArr = this.moveStringToMovePos(move)
            if (this.getPiece(movesArr[0]) instanceof Pieces.King) {
                // move king
                // move rook
                console.log("this is a king")
            } else {
                this.movePiece(movesArr[0], movesArr[1]);
            }
            this.turn.push(this.turn.shift());
        })
    }

    moveStringToMovePos(move) {
        if (move === "") {
            return [];
        }
        const moveHalves = move.split("-");
        const firstMoveString = moveHalves[0];
        const firstMoveX = this.convertLettersToNumbers()[firstMoveString[0]];
        const firstMoveY = parseInt(firstMoveString[1]) - 1
        const secondMoveString = moveHalves[1];
        const secondMoveX = this.convertLettersToNumbers()[secondMoveString[0]];
        const secondMoveY = parseInt(secondMoveString[1]) - 1
        return [[firstMoveY, firstMoveX], [secondMoveY, secondMoveX]];
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

    isGameOver() {
        // if (this.getKing(this.turn[0]).inCheck()) {
        //     this.isCheckMate(this.turn[0]);
        // } else {
        //     return false;
        // }
        return this.isCheckMate(this.turn[0]);

    }

    isCheckMate(color) {
        const pieces = this.getPieces(color);
        let checkMate = true;
        for (let i = 0; i < pieces.length; i++) {
            
            if (pieces[i].validMoves().length) {
                checkMate = false;
                break;
            }
        }
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

    addLostPiece(piece) {
        if (piece.color === "black") {
            this.blackLostPieces.push(this.blackPieces.splice(this.blackPieces.indexOf(piece), 1)[0]);
        } else {
            this.whiteLostPieces.push(this.whitePieces.splice(this.whitePieces.indexOf(piece), 1)[0]);
        }
    }

    getPieces(color) {
        if (color === "black") {
            return this.blackPieces;
        } else {
            return this.whitePieces;
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
            this.addLostPiece(temp);
        }
        this.grid[pos2[0]][pos2[1]] = piece;
        piece.position = pos2;
        this.grid[initialPos[0]][initialPos[1]] = new Pieces.NullPiece(initialPos, this);
        piece.justMoved();
    }

    dupe() {
        return new Board(this.moveString);
    }


    otherColor(color) {
        if (color === "black") {
            return "white";
        } else {
            return "black";
        }
    }

    getBoardValue(color) {
        let value = 0;
        this.getPieces(color).forEach(piece => {
            value += piece.getPositionValue();
        })
        this.getPieces(this.otherColor(color)).forEach(piece => {
            value -= piece.getPositionValue();
        })
        return value;
    }
}

export default Board;
