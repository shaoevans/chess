import React from "react";
import Board from "../../chess_backend/board";
import Tile from "./tile";
import { isMoveInValidMoves } from "./../../util/array_util";

class ChessBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            board: new Board(), 
            pieceSelected: null, 
            validMoves: [],
            lastMovePrev: null,
            lastMoveAfter: null,
            turn: ["black", "white"]
        };
        this.selectPiece = this.selectPiece.bind(this);
    }

    selectPiece(pos) {
        return (e) => {
            let validMoves;
            let piece = this.state.board.getPiece(pos);
            let lastMovePrev = null;
            let lastMoveAfter = null;
            if (!this.state.pieceSelected && (piece.color === this.state.turn[0])) {
                validMoves = piece.validMoves();
            } else {
                if (isMoveInValidMoves(this.state.validMoves, pos)) {
                    lastMovePrev = this.state.pieceSelected.position.slice();
                    lastMoveAfter = piece.position.slice();
                    this.state.board.movePiece(this.state.pieceSelected.position, pos)
                }
                piece = null;
                validMoves = [];
            }
            this.setState({pieceSelected: piece, validMoves: validMoves, lastMovePrev: lastMovePrev, lastMoveAfter: lastMoveAfter})
        }

    }
    render() {
        console.log(this.state.validMoves)
        const { pieceSelected, board, lastMovePrev, lastMoveAfter } = this.state
        return (
            <div className="chess-board">
                {board.grid.map((row, i) => {
                    return (<ul className="chess-row" key={i}>
                        {row.map((tile, j) => {
                            if (isMoveInValidMoves(this.state.validMoves, [i, j])) {
                                return <Tile validMove={true} lastMoveAfter={lastMoveAfter} lastMovePrev={lastMovePrev} pieceSelected={pieceSelected} selectPiece={this.selectPiece} ind={[i, j]} key={j} piece={board.getPiece([i, j])}/>
                            } else {
                                return <Tile validMove={false} lastMoveAfter={lastMoveAfter} lastMovePrev={lastMovePrev} pieceSelected={pieceSelected} selectPiece={this.selectPiece} ind={[i, j]} key={j} piece={board.getPiece([i, j])}/>
                            }
                        })}
                    </ul>)
                })}
            </div>
        )
    }
}

export default ChessBoard;

