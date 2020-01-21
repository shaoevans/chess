import React from "react";
import LobbyTableHeader from "./lobby_table_header";
import LobbyLeaderboardTable from "./lobby_leaderboard_table"


const LobbyLeaderboard = ({users}) => (
    <div className="lobby-leaderboard"> 
        <LobbyTableHeader title="Leaderboard" icon="trophy" url="/"/>
        <LobbyLeaderboardTable users={users}/>
    </div>
)
export default LobbyLeaderboard