
class Board {
    constructor() {
        this.grid = [];
        this.setupBoard();
    }

    setupBoard() {
        for (let i = 0; i < 8; i++) {
            this.grid.push([]);
            for (let j = 0; j < 8; j++) {
                this.grid[i].push(j);
            }
        }
    }
}

export default Board;