import React from "react";
import LichessBackground from "./lichess_background";
import LobbyTable from "./lobby_table";
import LobbyLeaderBoard from "./lobby_leaderboard";
import LobbyForum from "./lobby_forum";
import LobbyBlog from "./lobby_blog";
import ChessBoard from "../chess_board/chess_board";

class Lobby extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        // this.props.fetchForums();
        this.props.fetchLatestComments();
        this.props.fetchBlogs();
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
                    <LobbyForum comments={this.props.comments} />
                    <LobbyBlog blogs={this.props.blogs} />
                    <ChessBoard />

                </div>
            </div>
            
        )
    }
}

export default Lobby