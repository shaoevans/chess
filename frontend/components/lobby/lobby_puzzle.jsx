import React from "react";
import ChessThumbnail from "../chess_board/chess_thumbnail";
import { withRouter } from "react-router-dom";

const LobbyPuzzle = ({ chessMatch }) => {
    return (
        <div className="lobby-puzzle">
            <ChessThumbnail chessMatch={chessMatch} />
            <div className="lobby-puzzle-info">
                <div>
                    <div>Puzzle of the day</div>
                    <div>Black to play</div>
                    
                </div>
                {/* <div>
                    
                </div> */}
            </div>
        </div>
    )
}

export default withRouter(LobbyPuzzle);