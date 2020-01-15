import React from "react";
import * as Pieces from "./../../chess_backend/pieces"

class Tile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    greenDot() {
        if (this.props.validMove) {
            return <i className="valid fas fa-circle"></i>
        } else {
            return null;
        }
    }

    validTile() {
        if (this.props.validMove) {
            return "valid-tile";
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
    }

    render() {
        const { piece, selectPiece, ind, pieceSelected } = this.props
        if ((ind[0] + ind[1]) % 2 === 0) {
            return (
                <li onClick={selectPiece(ind)} className={`odd-tile ${this.validTile()} ${this.isSelected()} ${this.isLastMovePrev()} ${this.isLastMoveAfter()}`}>
                    {this.greenDot()}
                    {piece.render()}
                    {this.tileLabels()}
                </li>
            )
        } else {
            return (
                <li onClick={selectPiece(ind)} className={`even-tile ${this.validTile()} ${this.isSelected()} ${this.isLastMovePrev()} ${this.isLastMoveAfter()}`}>
                    {this.greenDot()}
                    {piece.render()}
                    {this.tileLabels()}
                </li>   
            )
        }
    }
}

export default Tile;