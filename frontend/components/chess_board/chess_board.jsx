import React from "react";
import Board from "../../chess_backend/board";
import Tile from "./tile";
import Timer from "react-compound-timer";
import { isMoveInValidMoves } from "./../../util/array_util";
import { Link } from "react-router-dom";
import AIPlayer from "./../../chess_backend/ai_player";


class ChessBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            board: new Board(), 
            moveString: this.props.chessMatch ? this.props.chessMatch.moveString : "",
            pieceSelected: null, 
            validMoves: [],
            lastMovePrev: null,
            lastMoveAfter: null,
            pending: this.props.chessMatch ? this.props.chessMatch.pending : true
            // pending: false
        };
        this.selectPiece = this.selectPiece.bind(this);
        this.undoMove = this.undoMove.bind(this);
        this.checkAiPlayer = this.checkAiPlayer.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.matchId !== prevProps.match.params.matchId) {
            this.setState({
                board: new Board(), 
                moveString: this.props.chessMatch ? this.props.chessMatch.moveString : "",
                pieceSelected: null, 
                validMoves: [],
                lastMovePrev: null,
                lastMoveAfter: null,
                pending: this.props.chessMatch ? this.props.chessMatch.pending : true
            });
            this.props.fetchAMatch(this.props.match.params.matchId)
                .then(match => this.state.board.setupBoard(this.props.chessMatch.moveString))
                .then(() => this.setState({
                    moveString: this.props.chessMatch.moveString,
                    lastMovePrev: this.state.board.moveStringToMovePos(this.props.chessMatch.moveString.substring(this.props.chessMatch.moveString.length - 5))[0],
                    lastMoveAfter: this.state.board.moveStringToMovePos(this.props.chessMatch.moveString.substring(this.props.chessMatch.moveString.length - 5))[1]
                }))
        }
    }
    componentDidMount() {
        this.props.fetchAMatch(this.props.match.params.matchId)
            .then(match => this.state.board.setupBoard(this.props.chessMatch.moveString))
            .then(() => this.setState({
                moveString: this.props.chessMatch.moveString,
                lastMovePrev: this.state.board.moveStringToMovePos(this.props.chessMatch.moveString.substring(this.props.chessMatch.moveString.length - 5))[0],
                lastMoveAfter: this.state.board.moveStringToMovePos(this.props.chessMatch.moveString.substring(this.props.chessMatch.moveString.length - 5))[1],
                pending: this.props.chessMatch.pending
            }))
        if (App.cable.subscriptions.subscriptions.length > 0) {
            App.cable.subscriptions.remove(App.cable.subscriptions['subscriptions'][0])
        };
        App.cable.subscriptions.create(
            { channel: "GameRoomChannel" },
            {
                received: data => {
                    
                    if (data.matchId !== this.props.chessMatch.id) {
                        return;
                    }

                    if (data.gameOver) {
                        this.setState({pending: false});
                    } else if (typeof data.refresh === "string") {
                        const newBoard = new Board(data.refresh);
                        const movePos = this.state.board.moveStringToMovePos(data.refresh.substring(data.refresh.length - 5));
                        const lastMovePrev = movePos[0];
                        const lastMoveAfter = movePos[1];
                        this.setState({
                            board: newBoard,
                            lastMovePrev: lastMovePrev,
                            lastMoveAfter: lastMoveAfter,
                            moveString: data.refresh
                        });
                    } else {
                        this.state.board.setupBoard(data.move) 
                        if (this.state.board.isGameOver()) {
                            App.cable.subscriptions.subscriptions[0].over({ matchId: this.props.chessMatch.id })
                        }
                        let newMoveString = this.state.moveString + data.move;
                        const movePos = this.state.board.moveStringToMovePos(data.move);
                        const lastMovePrev = movePos[0];
                        const lastMoveAfter = movePos[1];
                        if (this.state.moveString === "" ) {
                            newMoveString = this.state.moveString + data.move;
                            this.setState({
                                moveString: newMoveString,
                                lastMovePrev: lastMovePrev,
                                lastMoveAfter: lastMoveAfter
                             });
                        } else {
                            newMoveString = this.state.moveString + " " + data.move;
                            this.setState({
                                moveString: newMoveString,
                                lastMovePrev: lastMovePrev,
                                lastMoveAfter: lastMoveAfter
                            });
                        }
                        this.checkAiPlayer();
                    }
                },
                speak: function(data) {
                    return this.perform("speak", data);
                },
                undo: function(data) {
                    return this.perform("undo", data)
                },
                over: function(data) {
                    return this.perform("over", data)
                }
            }
        );
    }

    undoMove(e) {
        e.preventDefault();
        if (this.props.currentUser.username === this.convertTurnToOtherPlayer()) {
            App.cable.subscriptions.subscriptions[0].undo({ matchId: this.props.chessMatch.id })
        }
    }

    checkAiPlayer() {
        if (this.props.currentUser.username === this.convertTurnToOtherPlayer() && this.convertTurnToPlayer() === "ai_player_0") {
            const aiPlayer = new AIPlayer(this.state.board, this.state.board.turn[0]);
            const aiMove = aiPlayer.getMove0()
            const move1 = aiMove[0];
            const move2 = aiMove[1];
            setTimeout(() => 
                App.cable.subscriptions.subscriptions[0].speak({ matchId: this.props.chessMatch.id, move: this.moveToString(move1, move2) }),
                1000)
        } else if (this.props.currentUser.username === this.convertTurnToOtherPlayer() && this.convertTurnToPlayer() === "ai_player_1") {
            const aiPlayer = new AIPlayer(this.state.board, this.state.board.turn[0]);
            const aiMove = aiPlayer.getMove1()
            const move1 = aiMove[0];
            const move2 = aiMove[1];
            setTimeout(() => 
                App.cable.subscriptions.subscriptions[0].speak({ matchId: this.props.chessMatch.id, move: this.moveToString(move1, move2) }),
                1000)
        }
    }

    selectPiece(pos, color) {
        return (e) => {
            let validMoves;
            let piece = this.state.board.getPiece(pos);
            let moveString = this.state.moveString;
            if (!this.state.pieceSelected && this.currentUserColor() === color) {
                validMoves = piece.validMoves();
            } else {
                if (isMoveInValidMoves(this.state.validMoves, pos) && (this.convertTurnToPlayer() === this.props.currentUser.username)) {
                    const move1 = this.state.pieceSelected.position;
                    const move2 = pos;
                    App.cable.subscriptions.subscriptions[0].speak({ matchId: this.props.chessMatch.id, move: this.moveToString(move1, move2) })
                }
                piece = null;
                validMoves = [];
            }
            this.setState({
                pieceSelected: piece,
                validMoves: validMoves, 
                moveString: moveString, 
            });
        }
    }

    convertTurnToPlayer() {
        if (this.state.board.turn[0] === "black") {
            return this.props.chessMatch.blackPlayerName;
        } else {
            return this.props.chessMatch.whitePlayerName;
        }
    }

    convertTurnToOtherPlayer() {
        if (this.state.board.turn[1] === "black") {
            return this.props.chessMatch.blackPlayerName;
        } else {
            return this.props.chessMatch.whitePlayerName;
        }
    }

    currentUserColor() {
        if (this.props.currentUser.username === this.props.chessMatch.whitePlayerName) {
            return "white";
        } else {
            return "black";
        }
    }

    getTopPlayerName() {
        if (this.props.currentUser && this.props.currentUser.username === this.props.chessMatch.whitePlayerName) {
            return this.props.chessMatch.blackPlayerName;

        } else {
            return this.props.chessMatch.whitePlayerName;

        }

    }


    getBottomPlayerName() {
        if (this.props.currentUser && this.props.currentUser.username === this.props.chessMatch.whitePlayerName) {
            return this.props.chessMatch.whitePlayerName;
        } else if (this.props.currentUser && this.props.currentUser.username === this.props.chessMatch.blackPlayerName) {
            return this.props.chessMatch.blackPlayerName;
        } else {
            return this.props.chessMatch.blackPlayerName;
        }
    }

    moveToString(move1, move2) {
        const alphabet = "ABCDEFGH";
        const firstXNumber = (move1[0] + 1).toString();
        const firstYLetter = alphabet[7 - move1[1]];
        const secondXNumber = (move2[0] + 1).toString();
        const secondYLetter = alphabet[7 - move2[1]];
        return `${firstYLetter}${firstXNumber}-${secondYLetter}${secondXNumber}`;
    }

    rowsToTiles(i) {
        const { pieceSelected, board, lastMovePrev, lastMoveAfter } = this.state
        const result = []
        for (let j = 7; j >= 0; j--) {
            if (isMoveInValidMoves(this.state.validMoves, [i, j])) {
                result.push(<Tile validMove={true} 
                    orientation="white"  
                    currentTurn={this.state.board.turn[0]}
                    lastMoveAfter={lastMoveAfter} 
                    lastMovePrev={lastMovePrev} 
                    pieceSelected={pieceSelected}
                    selectPiece={this.selectPiece} 
                    ind={[i, j]} 
                    key={j} 
                    piece={board.getPiece([i, j])}/>)
            } else {
                result.push(<Tile validMove={false} 
                    orientation="white" 
                    currentTurn={this.state.board.turn[0]} 
                    lastMoveAfter={lastMoveAfter} 
                    lastMovePrev={lastMovePrev} 
                    pieceSelected={pieceSelected} 
                    selectPiece={this.selectPiece} 
                    ind={[i, j]} 
                    key={j} 
                    piece={board.getPiece([i, j])}/>)
            }
        }
        return (
            <ul className="chess-row">
                {result}
            </ul>
        )
    }

    gameOver() {
        return <div className="game-over">
            <p>{this.convertTurnToOtherPlayer()} Wins</p>
        </div>
    }


    
    abandonOrUndo() {
        if (this.state.moveString === "") {
            return <button><i className="fas fa-times"></i></button>
        } else {
            if (!this.state.pending) {
                return <button disabled><i className="fas fa-undo"></i></button>

            } else {
                return <button onClick={this.undoMove}><i className="fas fa-undo"></i></button>
            }
        }
    }

    chessBoardRender() {
        const { pieceSelected, board, lastMovePrev, lastMoveAfter } = this.state
        if (this.props.chessMatch.whitePlayerName === this.props.currentUser.username) {
            const result = [];
            for (let i = 7; i >= 0; i--) {
                result.push(this.rowsToTiles(i))
            }
            return (
                <div className="chess-board">
                    {result}    
                </div>
            )
        } else {
            return (
                <div className="chess-board">
                    {board.grid.map((row, i) => {
                        return (<ul className="chess-row" key={i}>
                            {row.map((tile, j) => {
                                if (isMoveInValidMoves(this.state.validMoves, [i, j])) {
                                    return <Tile validMove={true} 
                                    orientation="black" 
                                    lastMoveAfter={lastMoveAfter} 
                                    lastMovePrev={lastMovePrev} 
                                    pieceSelected={pieceSelected} 
                                    selectPiece={this.selectPiece} 
                                    currentTurn={this.state.board.turn[0]}
                                    ind={[i, j]} 
                                    key={j} 
                                    piece={board.getPiece([i, j])}/>
                                } else {
                                    return <Tile validMove={false} 
                                    currentTurn={this.state.board.turn[0]}
                                    orientation="black" 
                                    lastMoveAfter={lastMoveAfter} 
                                    lastMovePrev={lastMovePrev} 
                                    pieceSelected={pieceSelected} 
                                    selectPiece={this.selectPiece} 
                                    ind={[i, j]} 
                                    key={j}
                                    piece={board.getPiece([i, j])}/>
                                }
                            })}
                        </ul>)
                    })}
                </div>
            )
        }
    }

    render() {
        if (this.props.chessMatch) {
            return (
                <div className="chess-game-container">
                    <div className="chess-info">
                        <div>
                            <i className="fas fa-cogs"></i> 
                            <span>Unlimited Time</span>
                            <span>Classical</span>
                        </div>
                        <span><i className="far fa-circle"></i><Link to={`/users/${this.props.chessMatch.whitePlayerName}`}>{this.props.chessMatch.whitePlayerName}</Link></span>
                        <span><i className="black fas fa-circle"></i><Link to={`/users/${this.props.chessMatch.blackPlayerName}`}>{this.props.chessMatch.blackPlayerName}</Link></span>
                    </div>
                    <div className="chess-body">
                        {!this.state.pending && this.gameOver()}
                        {this.chessBoardRender()}
                    </div>
                    <div className="chess-sidebar">
                        <span className="chess-turn-string">{this.convertTurnToPlayer() === this.getTopPlayerName() ? `${this.getTopPlayerName()}'s turn` : null}</span>
                        <Timer
                            initialTime={59000}
                            startImmediately={false}
                            direction="backward"
                        >
                            {({ start, resume, pause, stop, reset, timerState }) => (
                                <React.Fragment>
                                    <div className="chess-clock-top">
                                        <div className="time">
                                            00:00
                                            {/* <Timer.Minutes />:
                                            <Timer.Seconds /> */}
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
                                <i className="fas fa-circle"></i>{this.getTopPlayerName()}
                            </div>
                            <div className="chess-sidebar-moves">
                                <span id="move-string">{this.state.moveString}</span> 
                            </div>
                            <div className="chess-sidebar-buttons">
                                {this.abandonOrUndo()}
                                <button><i className="far fa-hand-paper"></i></button>
                                <button><i className="far fa-flag"></i></button>
                            </div>
                            <div className="chess-sidebar-name">
                                <i className="fas fa-circle"></i>{this.getBottomPlayerName()}
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
                                        <div className="time">
                                            00:00
                                            {/* <Timer.Minutes />:
                                            <Timer.Seconds /> */}
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
                        <span className="chess-turn-string">{this.convertTurnToPlayer() === this.getBottomPlayerName() ? `${this.getBottomPlayerName()}'s turn` : null}</span>
                    </div>
                </div>
            )
        } else {
            return null;
        }
    }
}

export default ChessBoard;

