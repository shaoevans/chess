class PolyTreeNode {
    constructor(board, color, levels, parent) {
        this.children = [];
        this.board = board;
        this.Color = color;
        this.levels = levels;
        this.parent = parent;

    }

    getBoardValue(currentMin) {
        if (this.levels === 0) {
            const value = 0;
            this.board.getPieces(this.color).forEach(piece => {
                value += piece.getPositionValue();
            })
            return value;
        } else {
            this.addChildren();

            this.getMinChildrenValue(currentMin)
        }
    }

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
        this.board.getPieces(this.color).forEach(piece => {
            piece.validMoves.forEach(move => {
                validMoves.push([piece.position, move])
            })
        })
        validMoves.forEach(move => {
            let dupedBoard = this.dupe();
            dupedBoard.movePiece(move[0], move[1]);
            this.children.push(new PolyTreeNode(dupedBoard, this.color, this.otherColor, levels-1, ))
        })
    }

    getMinChildrenValue(currentMin) {
        let max;
        this.children.forEach(child => {
            let value = child.getBoardValue(currentMin);
            if (currentMin && value < currentMin) {
                return;
            } else {
                if (!max || value > max) {
                    max = value;
                }
            }
        })
        return max;
    }

}

export default PolyTreeNode;

// class PolyTreeNode
//     attr_reader :parent, :children, :value
//     def initialize(value)
//         @parent = nil
//         @children = []
//         @value = value
//     end

// def children
//     result = []
//     3.times do |i|
//       3.times do |j|
//         if @board.empty?([i,j])
//           duped_board = @board.dup
//           duped_board[[i,j]] = @next_mover_mark
//           result << TicTacToeNode.new(duped_board, self.other_mark, [i, j])
//         end
//       end
//     end
//     result
//   end
// end





//     def dfs(value)
//         return self if @value == value
//         @children.each do |child|
//             search_result = child.dfs(value)
//             return search_result if !search_result.nil?
//         end 
//         nil
//     end

//     def bfs(value)
//         queue = [self]
//         until queue.empty?
//             node = queue.shift
//             return node if node.value == value
//             queue += node.children
//         end
//         nil
//     end
// end



