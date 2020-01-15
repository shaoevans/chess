import React from "react";
import Board from "../../chess_backend/board";
import Tile from "./tile";
import Timer from "react-compound-timer";
import { isMoveInValidMoves } from "./../../util/array_util";


class ChessBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            board: new Board(), 
            moveString: "",
            pieceSelected: null, 
            validMoves: [],
            lastMovePrev: null,
            lastMoveAfter: null,
            turn: ["black", "white"]
        };
        this.selectPiece = this.selectPiece.bind(this);
        // this.moveChessPiece = this.moveChessPiece.bind(this);
    }

    componentDidMount() {
        // document.getElementById("move-string").addEventListener("DOMSubtreeModified", this.moveChessPiece);
        App.cable.subscriptions.create(
            { channel: "GameRoomChannel" },
            {
              received: data => {
                this.state.board.setupBoard(data.move) 
                this.setState({
                  moveString: this.state.moveString.concat(data.move)
                });
              },
              speak: function(data) {
                return this.perform("speak", data);
              }
            }
          );
    }

    // componentWillUnmount() {
    //     document.getElementById("move-string").removeEventListener("DOMSubtreeModified", this.moveChessPiece)
    // }
    
    // moveChessPiece() {
    //     const moveStringSpan = document.getElementById("move-string");
    //     let moveStringText = moveStringSpan.innerHTML
    //     this.state.board.setupBoard( moveStringText.substring(moveStringText.length - 5) )
    //     this.setState({board: this.state.board})
    // }

    selectPiece(pos) {
        return (e) => {
            let validMoves;
            let piece = this.state.board.getPiece(pos);
            let lastMovePrev = this.state.lastMovePrev;
            let lastMoveAfter = this.state.lastMoveAfter;
            let moveString = this.state.moveString;
            let turn = this.state.turn.slice();
            if (!this.state.pieceSelected && (piece.color === this.state.turn[0])) {
                validMoves = piece.validMoves();
            } else {
                if (isMoveInValidMoves(this.state.validMoves, pos)) {
                    lastMovePrev = this.state.pieceSelected.position.slice();
                    lastMoveAfter = piece.position.slice();
                    const move1 = this.state.pieceSelected.position;
                    const move2 = pos;
                    // moveString += `${this.moveToString(move1, move2)}`;
                    App.cable.subscriptions.subscriptions[0].speak({ matchId: 1, move: this.moveToString(move1, move2) })
                    // change matchid later
                    // this.state.board.movePiece(this.state.pieceSelected.position, pos);
                    turn.push(turn.shift());
                }
                piece = null;
                validMoves = [];
            }
            this.setState({pieceSelected: piece, validMoves: validMoves, lastMovePrev: lastMovePrev, lastMoveAfter: lastMoveAfter, moveString: moveString, turn: turn});
        }

    }

    moveToString(move1, move2) {
        const alphabet = "ABCDEFGH";
        const firstXNumber = (move1[0] + 1).toString();
        const firstYLetter = alphabet[7 - move1[1]];
        const secondXNumber = (move2[0] + 1).toString();
        const secondYLetter = alphabet[7 - move2[1]];
        return ` ${firstYLetter}${firstXNumber}-${secondYLetter}${secondXNumber}`;
    }

    render() {
        const { pieceSelected, board, lastMovePrev, lastMoveAfter } = this.state
        return (
            <div className="chess-game-container">
                <div className="chess-info">
                    <div>
                        <i className="fas fa-cogs"></i> 
                        info
                    </div>
                    <span><i className="far fa-circle"></i>Sami</span>
                    <span><i className="black fas fa-circle"></i>Evans</span>
                </div>
                <div className="chess-body">
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
                </div>
                <div className="chess-sidebar">
                    <Timer
                        initialTime={59000}
                        startImmediately={false}
                        direction="backward"
                    >
                        {({ start, resume, pause, stop, reset, timerState }) => (
                            <React.Fragment>
                                <div className="chess-clock-top">
                                    <div>
                                        <Timer.Minutes />:
                                        <Timer.Seconds />
                                    </div>
                                    <br />
                                    <div>
                                        {/* <button onClick={start}>Start</button> */}
                                        {/* <button onClick={pause}>Pause</button> */}
                                        {/* <button onClick={resume}>Resume</button> */}
                                        {/* <button onClick={stop}>Stop</button> */}
                                        {/* <button onClick={reset}>Reset</button> */}
                                    </div>
                                </div>
                            </React.Fragment>
                        )}
                    </Timer>
                    <div className="chess-sidebar-info">
                        <div className="chess-sidebar-name">
                            <i className="fas fa-circle"></i>Sami
                        </div>
                        <div className="chess-sidebar-moves">
                            <span id="move-string">{this.state.moveString}</span> 
                        </div>
                        <div className="chess-sidebar-buttons">
                            <button><i className="fas fa-times"></i></button>
                            <button><i className="far fa-hand-paper"></i></button>
                            <button><i className="far fa-flag"></i></button>
                        </div>
                        <div className="chess-sidebar-name">
                            <i className="fas fa-circle"></i>Evans
                        </div>
                    </div>
                    <Timer
                        initialTime={59000}
                        startImmediately={false}
                        direction="backward"
                    >
                        {({ start, resume, pause, stop, reset, timerState }) => (
                            <React.Fragment>
                                <div className="chess-clock-bottom">
                                    <div>
                                        <Timer.Minutes />:
                                        <Timer.Seconds />
                                    </div>
                                    <br />
                                    <div>
                                        {/* <button onClick={start}>Start</button> */}
                                        {/* <button onClick={pause}>Pause</button> */}
                                        {/* <button onClick={resume}>Resume</button> */}
                                        {/* <button onClick={stop}>Stop</button> */}
                                        {/* <button onClick={reset}>Reset</button> */}
                                    </div>
                                </div>
                            </React.Fragment>
                        )}
                    </Timer>
                </div>
            </div>
        )
    }
}

export default ChessBoard;

