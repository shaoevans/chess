import React from "react";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";
import { dateMaker } from "./../../util/date_util";

const Comment = ({comment, index, path, now, fetchUser}) => {
    const last = new Date(comment.updatedAt);
    const difference = Math.floor((now - last)/(1000*60))
    return ( 
        <li className="comment-container">
            <div id={index} className="comment-header">
                <div className="comment-info">
                    <div onMouseOver={fetchUser(comment.author.username)}>
                        <Link to={`/users/${comment.author.username}`}>{comment.author.username}</Link>
                        <div>
                        </div>
                    </div>
                    <span>{dateMaker(difference)}</span>
                    {/* {comment} */}
                </div>
                {/* <span onMouseEnter={} onMouseLeave={}>{comment.authorId}</span> */}
                {/* <HashLink to="/">#{index}</HashLink> */}
                <span><HashLink smooth to={`${path}#${index}`}>#{index}</HashLink></span>
            </div>
            <div id={index}className="comment-body">
                {comment.body}
            </div>
        </li>
    )
}

export default Comment;