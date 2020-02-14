import React from "react";
import Tile from "./tile";
import Board from "../../chess_backend/board";
import ThumbnailTile from "./thumbnail_tile";


class ChessThumbnail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            board: new Board(this.props.chessMatch.moveString),
            moveString: this.props.chessMatch ? this.props.chessMatch.moveString : "",
            pieceSelected: null,
            validMoves: [],
            pending: this.props.chessMatch ? this.props.chessMatch.pending : true
        }


    }


    componentDidMount() {
        this.setState({
            lastMovePrev: this.state.board.moveStringToMovePos(this.props.chessMatch.moveString.substring(this.props.chessMatch.moveString.length - 5))[0],
            lastMoveAfter: this.state.board.moveStringToMovePos(this.props.chessMatch.moveString.substring(this.props.chessMatch.moveString.length - 5))[1],
        })
    }

    render() {
        return (
            <div className="chess-board">
                {this.state.board.grid.map((row, i) => {
                    return <ul key={i} className="chess-row">
                        {row.map((tile, j) => {
                            return <ThumbnailTile 
                            key={`${i}${j}`}
                            currentTurn={this.state.board.turn[0]}
                            ind={[i, j]}
                            piece={this.state.board.getPiece([i, j])}
                            lastMoveAfter={this.state.lastMoveAfter} 
                            lastMovePrev={this.state.lastMovePrev} 
                            />
                        })}
                    </ul>
                })}
            </div>
        )
    }
}


export default ChessThumbnail