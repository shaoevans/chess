import React from "react";
import * as Pieces from "./../../chess_backend/pieces"

class Tile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    greenDot() {
        if (this.props.validMove && this.props.currentTurn === this.props.pieceSelected.color) {
            return <i className="valid fas fa-circle"></i>
        } else if (this.props.validMove) {
            return <i className="valid2 fas fa-circle"></i>
        } else {
            return null;
        }
    }

    validTile() {
        if (this.props.validMove && this.props.currentTurn === this.props.pieceSelected.color) {
            return "valid-tile";
        } else if (this.props.validMove) {
            return "valid-tile2"
        } else {
            return "";
        }
    }

    isSelected() {
        if (this.props.pieceSelected === this.props.piece) {
            return "selected-tile";
        } else {
            return "";
        }
    }

    isLastMovePrev() {
        if (this.props.lastMovePrev && (this.props.lastMovePrev[0] === this.props.ind[0]) && (this.props.lastMovePrev[1] === this.props.ind[1])) {
            return "last-prev-tile"
        } else {
            return ""
        }
    }

    isLastMoveAfter() {
        if (this.props.lastMoveAfter && (this.props.lastMoveAfter[0] === this.props.ind[0]) && (this.props.lastMoveAfter[1] === this.props.ind[1])) {
            return "last-after-tile"
        } else {
            return ""
        }
    }

    tileLabels() {
        if (this.props.orientation === "black") {
            if (this.props.ind[0] === 7) {
                if (this.props.ind[1] === 0) {
                    return <span className="letter-label odd">h</span>
                } else if (this.props.ind[1] === 1) {
                    return <span className="letter-label even">g</span>
                } else if (this.props.ind[1] === 2) {
                    return <span className="letter-label odd">f</span>
                } else if (this.props.ind[1] === 3) {
                    return <span className="letter-label even">e</span>
                } else if (this.props.ind[1] === 4) {
                    return <span className="letter-label odd">d</span>
                } else if (this.props.ind[1] === 5) {
                    return <span className="letter-label even">c</span>
                } else if (this.props.ind[1] === 6) {
                    return <span className="letter-label odd">b</span>
                } else if (this.props.ind[1] === 7) {
                    return (
                        <div>   
                            <span className="letter-label even">a</span>
                            <span className="number-label even">8</span>
                        </div>
                    )
                }
            } else if (this.props.ind[1] === 7) {
                if (this.props.ind[0] === 0) {
                    return <span className="number-label odd">1</span>
                } else if (this.props.ind[0] === 1) {
                    return <span className="number-label even">2</span>
                } else if (this.props.ind[0] === 2) {
                    return <span className="number-label odd">3</span>
                } else if (this.props.ind[0] === 3) {
                    return <span className="number-label even">4</span>
                } else if (this.props.ind[0] === 4) {
                    return <span className="number-label odd">5</span>
                } else if (this.props.ind[0] === 5) {
                    return <span className="number-label even">6</span>
                } else if (this.props.ind[0] === 6) {
                    return <span className="number-label odd">7</span>
                }
            } 
        } else {
            if (this.props.ind[0] === 0) {
                if (this.props.ind[1] === 0) {
                    return (
                        <div>
                            <span className="number-label even">1</span>
                            <span className="letter-label even">h</span>
                        </div>
                    )
                } else if (this.props.ind[1] === 1) {
                    return <span className="letter-label odd">g</span>
                } else if (this.props.ind[1] === 2) {
                    return <span className="letter-label even">f</span>
                } else if (this.props.ind[1] === 3) {
                    return <span className="letter-label odd">e</span>
                } else if (this.props.ind[1] === 4) {
                    return <span className="letter-label even">d</span>
                } else if (this.props.ind[1] === 5) {
                    return <span className="letter-label odd">c</span>
                } else if (this.props.ind[1] === 6) {
                    return <span className="letter-label even">b</span>
                } else if (this.props.ind[1] === 7) {
                    return (
                        <div>   
                            <span className="letter-label odd">a</span>
                        </div>
                    )
                }
            } else if (this.props.ind[1] === 0) {
                if (this.props.ind[0] === 1) {
                    return <span className="number-label odd">2</span>
                } else if (this.props.ind[0] === 2) {
                    return <span className="number-label even">3</span>
                } else if (this.props.ind[0] === 3) {
                    return <span className="number-label odd">4</span>
                } else if (this.props.ind[0] === 4) {
                    return <span className="number-label even">5</span>
                } else if (this.props.ind[0] === 5) {
                    return <span className="number-label odd">6</span>
                } else if (this.props.ind[0] === 6) {
                    return <span className="number-label even">7</span>
                } else {
                    return <span className="number-label odd">8</span>
                }
                
            } 
        }
    }

    isInCheck() {
        if (this.props.piece.inCheck()) {
            if ((this.props.ind[0] + this.props.ind[1]) % 2 === 0) {
                return "in-check-odd"
            } else {
                return "in-check-even"
            }
        } else {
            return "";
        }
    }

    render() {
        const { piece, selectPiece, ind } = this.props
        if ((ind[0] + ind[1]) % 2 === 0) {
            return (
                <li onClick={selectPiece(piece.position, piece.color)} className={`odd-tile ${this.validTile()} ${this.isSelected()} ${this.isLastMovePrev()} ${this.isLastMoveAfter()} ${piece instanceof Pieces.King ? this.isInCheck() : null}`}>
                    {this.greenDot()}
                    {piece.render()}
                    {this.tileLabels()}
                </li>
            )
        } else {
            return (
                <li onClick={selectPiece(piece.position, piece.color)} className={`even-tile ${this.validTile()} ${this.isSelected()} ${this.isLastMovePrev()} ${this.isLastMoveAfter()} ${piece instanceof Pieces.King ? this.isInCheck() : null}`}>
                    {this.greenDot()}
                    {piece.render()}
                    {this.tileLabels()}
                </li>   
            )
        }
    }
}

export default Tile;