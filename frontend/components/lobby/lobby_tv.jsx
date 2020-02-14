import React from "react";
import ChessThumbnail from "../chess_board/chess_thumbnail";
import { withRouter } from "react-router-dom";

const LobbyTV = ({ chessMatch, history }) => {
    const onClick = () => {
        history.push(`/matches/${chessMatch.id}`)
    }
    
    return (
        <div  onClick={onClick} className="lobby-tv">
            <ChessThumbnail chessMatch={chessMatch} />
            <div className="lobby-tv-info">
                <div>
                    {chessMatch.blackPlayerName}        
                </div>
                <div>
                    vs
                </div>
                <div>
                    {chessMatch.whitePlayerName}
                </div>
            </div>
        </div>
    )
}

export default withRouter(LobbyTV)