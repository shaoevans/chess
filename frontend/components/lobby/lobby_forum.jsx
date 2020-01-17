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
                            {comment.post && comment.post.title ? (
                                <span><Link className="post-link" to={`/forums/${comment.post.forumId}/posts/${comment.post.id}`}>{comment.post.title.length > 24 ? `${comment.post.title.slice(0,24)}...` : comment.post.title }</Link></span>
                            ) : (
                                null
                            )}
                            <span><Link className="username-link" to={`/users/${comment.author.username}`}>{comment.author.username}</Link></span>
                            <span>{comment.body}</span>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default LobbyForum;