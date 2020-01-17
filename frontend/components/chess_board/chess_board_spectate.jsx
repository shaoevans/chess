import React from "react";

class ChessBoardSpectate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            board: new Board(), 
            moveString: this.props.chessMatch ? this.props.chessMatch.moveString : "",
            pieceSelected: null, 
            validMoves: [],
            lastMovePrev: null,
            lastMoveAfter: null,
        };
        this.selectPiece = this.selectPiece.bind(this);
    }

    componentDidMount() {
        this.props.fetchAMatch(1)
            .then(match => this.state.board.setupBoard(this.props.chessMatch.moveString))
            .then(() => this.setState({
                moveString: this.props.chessMatch.moveString,
                lastMovePrev: this.state.board.moveStringToMovePos(this.props.chessMatch.moveString.substring(this.props.chessMatch.moveString.length - 5))[0],
                lastMoveAfter: this.state.board.moveStringToMovePos(this.props.chessMatch.moveString.substring(this.props.chessMatch.moveString.length - 5))[1]
            }))
        App.cable.subscriptions.create(
            { channel: "GameRoomChannel" },
            {
                received: data => {
                    if (data.matchId !== this.props.chessMatch.id) {
                        return;
                    }
                    if (data.refresh) {
                        const newBoard = new Board(data.refresh);
                        const movePos = this.state.board.moveStringToMovePos(data.move);
                        const lastMovePrev = movePos[0];
                        const lastMoveAfter = movePos[1];
                        this.setState({
                            board: newBoard,
                            lastMovePrev: lastMovePrev,
                            lastMoveAfter: lastMoveAfter
                        });
                    } else {
                        this.state.board.setupBoard(data.move) 
                        let newMoveString = this.state.moveString + data.move;
                        const movePos = this.state.board.moveStringToMovePos(data.move);
                        const lastMovePrev = movePos[0];
                        const lastMoveAfter = movePos[1];
                        if (this.state.moveString === "" ) {
                            newMoveString = this.state.moveString + data.move;
                            this.setState({
                                moveString: newMoveString
                             });
                        } else {
                            newMoveString = this.state.moveString + " " + data.move;
                            this.setState({
                                moveString: newMoveString,
                                lastMovePrev: lastMovePrev,
                                lastMoveAfter: lastMoveAfter
                            });
                        }
                    }
                }
            }
        );
    }

}

export default ChessBoardSpectate;