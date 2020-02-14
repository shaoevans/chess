import React from "react";
import { withRouter } from "react-router-dom";

const LobbyLeaderboardTable = ({ users, history }) => {
    return (
        <ul>
            {users.map((user, i) => {
                return (
                    <li onClick={() => history.push(`users/${user.username}`)} key={user.id} className={(i % 2 === 0) ? "gray lobby-leader-row" : "white lobby-leader-row"}>
                        <span><i className="fas fa-circle"></i> {user.username}</span>
                        <div>
                            <span><i className="fas fa-bolt"></i>{user.bulletElo}</span>
                            <span><i className="fas fa-fire"></i>{user.blitzElo}</span>
                            <span><i className="fas fa-frog"></i>{user.rapidElo}</span>
                            <span><i className="fas fa-snowplow"></i>{user.classicalElo}</span>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}

export default withRouter(LobbyLeaderboardTable);