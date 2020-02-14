import React from "react";
import * as Pieces from "./../../chess_backend/pieces"

class ThumbnailTile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
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
        const { piece, ind } = this.props
        if ((ind[0] + ind[1]) % 2 === 0) {
            return (
                <li className={`odd-thumbnail-tile ${this.isLastMovePrev()} ${this.isLastMoveAfter()} ${piece instanceof Pieces.King ? this.isInCheck() : null}`}>
                    {piece.render()}
                </li>
            )
        } else {
            return (
                <li className={`even-thumbnail-tile ${this.isLastMovePrev()} ${this.isLastMoveAfter()} ${piece instanceof Pieces.King ? this.isInCheck() : null}`}>
                    {piece.render()}
                </li>   
            )
        }
    }
}

export default ThumbnailTile;