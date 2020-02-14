import React from "react";
import LichessBackground from "./lichess_background";
import LobbyTable from "./lobby_table";
import LobbyLeaderBoard from "./lobby_leaderboard";
import LobbyForum from "./lobby_forum";
import LobbyBlog from "./lobby_blog";
import LobbySide from "./lobby_side";
import LobbySupport from "./lobby_support";
import LobbyTV from "./lobby_tv";
import LobbyPuzzle from "./lobby_puzzle";

class Lobby extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.fetchLatestComments();
        this.props.fetchBlogs();
        this.props.fetchUsers();
        this.props.fetchLobbyMatch();
    }



    render() {
        return (
            <div>
                <div className="lobby">
                    {this.props.lobbyMatch && <LobbyTV chessMatch={this.props.lobbyMatch} />}
                    {this.props.lobbyMatch && <LobbyPuzzle chessMatch={this.props.lobbyMatch} />}
                    <LichessBackground />
                    <LobbySide />
                    <LobbyTable />
                    <LobbyLeaderBoard users={this.props.users}/>
                    <LobbyForum comments={this.props.comments} />
                    <LobbySupport />
                    <LobbyBlog blogs={this.props.blogs} />
                    {/* <ChessBoard /> */}
                    
                </div>
            </div>
            
        )
    }
}

export default Lobby