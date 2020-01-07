import React from "react";
import { Link } from "react-router-dom";

const ForumIndexItem = ({forum, index}) => {
    if (index % 2 === 0) {
        return (
            <tr className="table-row white">
                <td>
                    <h2><Link to={`forums/${forum.id}`}>{forum.category}</Link></h2>
                    <p>{forum.description}</p>
                </td>
                <td>{forum.post_ids.length}</td>
                <td></td>
                <td></td>
            </tr>
        )
    } else {
        return (
            <tr className="table-row gray">
                <td>
                    <h2><Link to={`forums/${forum.id}`}>{forum.category}</Link></h2>
                    <p>{forum.description}</p>
                </td>
                <td>{forum.post_ids.length}</td>
                <td></td>
                <td></td>
            </tr>
        )
    }
}

export default ForumIndexItem;