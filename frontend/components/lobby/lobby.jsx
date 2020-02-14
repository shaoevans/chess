import React from "react";
import LichessBackground from "./lichess_background";
import LobbyTable from "./lobby_table";
import LobbyLeaderBoard from "./lobby_leaderboard";
import LobbyForum from "./lobby_forum";
import LobbyBlog from "./lobby_blog";
import LobbySide from "./lobby_side";
import ChessBoard from "../chess_board/chess_board";
import { fetchUserCurrentMatches } from "../../actions/match_actions";

class Lobby extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.fetchLatestComments();
        this.props.fetchBlogs();
        this.props.fetchUsers();
    }



    render() {
        return (
            <div>
                <div className="lobby">
                    <LichessBackground />
                    <LobbySide />
                    <LobbyTable />
                    <LobbyLeaderBoard users={this.props.users}/>
                    <LobbyForum comments={this.props.comments} />
                    <LobbyBlog blogs={this.props.blogs} />
                    {/* <ChessBoard /> */}
                    
                </div>
            </div>
            
        )
    }
}

export default Lobby