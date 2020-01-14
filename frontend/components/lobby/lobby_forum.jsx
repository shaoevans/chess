import React from "react";
import LobbyTableHeader from "./lobby_table_header";
import { Link } from "react-router-dom"

export const LobbyForum = ({comments}) => {
    return (
        <div className="lobby-forum">
            <LobbyTableHeader title="Latest forum posts" url="/forums" icon="comments"/>
            <ul className="lobby-forum-table">
            {comments.map((comment, i) => {
                    return (
                        <li key={i}>
                            <span>{comment.postId}</span>
                            <span><Link to={`/users/${comment.author.username}`}>{comment.author.username}</Link></span>
                            <span>{comment.body}</span>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default LobbyForum;