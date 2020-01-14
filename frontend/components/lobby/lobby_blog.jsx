import React from "react";
import LobbyTableHeader from "./lobby_table_header";
import { formatDate, getYear } from "./../../util/date_util";
import { Link } from "react-router-dom"

const LobbyBlog = ({ blogs }) => {
    return (
        <div className="lobby-blog">
            <LobbyTableHeader title="Latest Updates" url="/blog" icon="pen-alt" />
            <ul className="lobby-blog-table">
                {blogs.map((blog, i) => {
                    return (
                        <li key={i}>
                            <Link to={`/blog/${getYear(blog.createdAt)}/${blog.id}`}>
                                <div className="blog-image">
                                    <img src={window[`_${blog.imageId}`]}/>
                                </div>
                                <div className="blog-content">
                                    <p className="blog-content-title">{blog.title}</p>
                                    <p>{blog.description}</p>
                                </div>
                                <span>
                                    {formatDate(blog.createdAt)}
                                </span>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default LobbyBlog;