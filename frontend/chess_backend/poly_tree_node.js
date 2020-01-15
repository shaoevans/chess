class PolyTreeNode {
    constructor(board, color, levels, highestValue) {
        this.parent = null;
        this.children = [];
        this.board = board;
        this.color = color;
        this.levels = levels;
        this.currentMin = null;
    }

    getBoardValue() {
        
    }

    addChild(child) {
        child.parent = this;
        this.children.push(child);
    }

    removeChild(child) {
        this.children.splice(this.children.indexOf(child), 1);
    }

    dfs(value) {

    }

    children() {

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



