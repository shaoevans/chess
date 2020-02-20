class PolyTreeNode {
    constructor(board, color, levels, parent) {
        this.children = [];
        this.board = board;
        this.color = color;
        this.levels = levels;
        this.parent = parent;

    }

    getBoardValue() {
        return this.board.getBoardValue(this.board.turn[0]);
    }

    // if level is 0, evaluate heuristic score for every node
    // if level is >0, evaluate min or max score for children
    dupe() {
        let result = [];
        for (let i = 0; i < 8; i++) {
            result.push([]);
            for (let j = 0; j < 8; j++) {
                result[0].push(this.board.getPiece([i, j]).clone())
            }
        }
        return result;
    }

    addChildren() {
        const validMoves = []
        this.board.getPieces(this.board.turn[0]).forEach(piece => {
            piece.validMoves.forEach(move => {
                validMoves.push([piece.position, move])
            })
        })
        validMoves.forEach(move => {
            let dupedBoard = this.dupe();
            dupedBoard.movePiece(move[0], move[1]);
            this.children.push(new PolyTreeNode(dupedBoard, this.color, this.otherColor, this.level - 1, ))
        })
    }

    getMinChildrenValue() {
        if (this.level === 1) {
            return this.getBoardValue();
        } else {
            this.addChildren();
            return this.getMaxChildrenValue();
        }
    }
    
    getMaxChildrenValue() {
        if (this.level === 1) {
            return this.getBoardValue();
        } else {
            this.addChildren();
            return this.getMinChildrenValue();
        }
    }

}

export default PolyTreeNode;





