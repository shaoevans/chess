import React from "react"
import { Link } from "react-router-dom"
import { HashLink } from "react-router-hash-link";
import { dateMaker } from "./../../util/date_util";

const PostIndexItem = ({post, forumId, index, now}) => {
    const last = new Date(post.lastComment.createdAt)
    const difference = Math.floor((now - last)/(1000*60))

    if (index % 2 === 0) {
        return (
            <tr className="table-row white">
                <td><Link to={`/forums/${forumId}/posts/${post.id}`}>{post.title}</Link></td>
                <td>{post.views}</td>
                <td>{post.commentCount}</td>
                <td>
                    <p><HashLink smooth to={`/forums/${forumId}/posts/${post.id}#${post.lastCommentIndex}`}>{dateMaker(difference)}</HashLink></p>
                    <p className="username-link"><Link to={`/users/${post.lastAuthor.username}`}>{post.lastAuthor.username}</Link></p>
                </td>
            </tr>
        )   
    } else {
        return (
            <tr className="table-row gray">
                <td><Link to={`/forums/${forumId}/posts/${post.id}`}>{post.title}</Link></td>
                <td>{post.views}</td>
                <td>{post.commentCount}</td>
                <td>
                    <p><HashLink smooth to={`/forums/${forumId}/posts/${post.id}#${post.lastCommentIndex}`}>{dateMaker(difference)}</HashLink></p>
                    <p><Link className="username-link" to={`/users/${post.lastAuthor.username}`}>{post.lastAuthor.username}</Link></p>
               </td>
            </tr>
        )
    }

}

export default PostIndexItem;