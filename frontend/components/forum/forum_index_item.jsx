import React from "react";
import { Link } from "react-router-dom";
import { dateMaker } from "./../../util/date_util";
import { HashLink } from "react-router-hash-link";

const ForumIndexItem = ({forum, index, now}) => {
    const last = new Date(forum.lastComment.createdAt);
    const difference = Math.floor((now - last)/(1000*60))

    if (index % 2 === 0) {
        return (
            <tr className="table-row white">
                <td>
                    <h2><Link to={`/forums/${forum.id}`}>{forum.category}</Link></h2>
                    <p>{forum.description}</p>
                </td>
                <td>{forum.postCount}</td>
                <td>{forum.commentCount}</td>
                <td>
                    <p><HashLink smooth to={`/forums/${forum.id}/posts/${forum.lastComment.postId}?page=${1}#bottom`}>{dateMaker(difference)}</HashLink></p>
                    <p>{forum.lastComment.author.username}</p>
                </td>
            </tr>
        )
    } else {
        return (
            <tr className="table-row gray">
                <td>
                    <h2><Link to={`/forums/${forum.id}`}>{forum.category}</Link></h2>
                    <p>{forum.description}</p>
                </td>
                <td>{forum.postCount}</td>
                <td>{forum.commentCount}</td>
                <td>
                    <p><HashLink smooth to={`/forums/${forum.id}/posts/${forum.lastComment.postId}?page=${1}#bottom`}>{dateMaker(difference)}</HashLink></p>
                    <p>{forum.lastComment.author.username}</p>
                </td>
            </tr>
        )
    }
}

// page number in state
// if page number is 10

export default ForumIndexItem;