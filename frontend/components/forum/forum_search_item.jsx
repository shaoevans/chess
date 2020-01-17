import React from "react";
import { Link } from "react-router-dom";
import { dateMaker } from "./../../util/date_util";


const ForumSearchItem = ({comment, index, now}) => {
    const last = new Date(comment.updatedAt);
    const difference = Math.floor((now - last)/(1000*60));

    return (
        <tr className={(index % 2 === 0) ? "gray forum-search-row" : "white forum-search-row"}>
            <td>
                <h2><Link to={`/forums/${comment.post.forumId}/posts/${comment.post.id}`}>{comment.post.title}</Link></h2>
                <p>{comment.body}</p>
            </td>
            <td>
                <p>{dateMaker(difference)}</p>
                <p><Link to={`/users/${comment.author.username}`}>{comment.author.username}</Link></p>
            </td>
        </tr>
    )
}

export default ForumSearchItem;