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
        // console.log(this.props.lastMoveAfter)
        if (this.props.lastMoveAfter && (this.props.lastMoveAfter[0] === this.props.ind[0]) && (this.props.lastMoveAfter[1] === this.props.ind[1])) {
            return "last-after-tile"
        } else {
            return ""
        }
    }

    render() {
        const { piece, selectPiece, ind, pieceSelected } = this.props
        if ((ind[0] + ind[1]) % 2 === 0) {
            return (
                <li onClick={selectPiece(ind)} className={`odd-tile ${this.validTile()} ${this.isSelected()} ${this.isLastMovePrev()} ${this.isLastMoveAfter()}`}>
                    {this.greenDot()}
                    {piece.render()}
                </li>
            )
        } else {
            return (
                <li onClick={selectPiece(ind)} className={`even-tile ${this.validTile()} ${this.isSelected()} ${this.isLastMovePrev()} ${this.isLastMoveAfter()}`}>
                    {this.greenDot()}
                    {piece.render()}
                </li>   
            )
        }
    }
}

export default Tile;