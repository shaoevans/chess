import PolyTreeNode from "./poly_tree_node";
import Board from "./board";

class AIPlayer {
    constructor(board, color, moveString) {
        this.board = board;
        this.color = color;
        this.moveString = moveString;
        this.getMove1 = this.getMove1.bind(this);
    }
    // constructor(board, level) {
    //     this.polyTree =  new PolyTreeNode(board, level)
    // }



    getOtherColor() {
        if (this.color === "black") {
            return "white";
        } else {
            return "black";
        }
    }


    getMove0() {
        // if (this.level === 0) {

        const pieces = this.board.getPieces(this.color);
        const possibleMoves = [];
        pieces.forEach(piece => {
            piece.validMoves().forEach(move => {
                possibleMoves.push([piece.position, move])
            })
        })
        return possibleMoves[Math.floor(Math.random() * possibleMoves.length)]
        // } else {
            // const treeNode = new PolyTreeNode(this.board, this.color, this.getOtherColor(), this.level )
            // let moves = treeNode.getMove()
            // return moves;
        // }
    }

    getMove1() {
        const pieces = this.board.getPieces(this.color);
        const possibleMoves = [];
        let bestMove;
        let max;
        pieces.forEach(piece => {
            piece.validMoves().forEach(move => {
                possibleMoves.push([piece.position, move])
            })
        })
        let move;
        for (let i = 0; i < possibleMoves.length; i++) {
            move = possibleMoves[i];
            let dupedBoard = new Board(this.moveString);
            dupedBoard.movePiece(move[0], move[1])
            let dupedBoardValue = dupedBoard.getBoardValue(this.color)
            if (!max || dupedBoardValue > max) {
                max = dupedBoardValue;
                bestMove = move;
            }
        }
        return bestMove;
    }

    getMove2() {
        const pieces = this.board.getPieces(this.color);
    }
}

export default AIPlayer