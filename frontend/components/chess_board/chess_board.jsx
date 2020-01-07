import React from "react";
import Board from "../../chess_backend/board";
import Tile from "./tile";

class ChessBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {board: new Board()};
    }

    render() {
        let grid = this.state.board.grid;
        return (
            <div className="chess-board">
                {grid.map((row, i) => {
                    return (<ul className="chess-row" key={i}>
                        {row.map((tile, j) => {
                            return <Tile ind={i+j} key={j}/>
                        })}
                    </ul>)
                })}
            </div>
        )
    }
}

export default ChessBoard;