import React from "react";
import LichessBackground from "./lichess_background";
import LobbyTable from "./lobby_table";
import LobbyLeaderBoard from "./lobby_leaderboard";
import ChessBoard from "../chess_board/chess_board";

class Lobby extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <div className="lobby">
                    <div className="lobby-app">
                        <LichessBackground />
                    </div>
                    <LobbyTable />
                    <LobbyLeaderBoard />
                </div>
                <ChessBoard />
            </div>
            
        )
    }
}

export default Lobby