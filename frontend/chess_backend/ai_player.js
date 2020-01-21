import PolyTreeNode from "./poly_tree_node";

class AIPlayer {
    constructor(board, color, level) {
        this.board = board;
        this.color = color;
        this.level = level;
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
        possibleMoves.forEach(move => {
            let dupedBoard = this.board.dupe();
            dupedBoard.movePiece(move[0], move[1])
            let dupedBoardValue = dupedBoard.getBoardValue(this.color)
            if (!max || dupedBoardValue > max) {
                bestMove = move;
            }
        })
        return bestMove;
    }
}

export default AIPlayer