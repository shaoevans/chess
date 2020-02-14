import React from "react";
import LobbyTableHeader from "./lobby_table_header";
import { formatDate, getYear } from "./../../util/date_util";
import { Link } from "react-router-dom"

const LobbyBlog = ({ blogs }) => {
    const imageUrls = {
        1: _1,
        2: _2,
        3: _3,
        4: _4,
        5: _5,
        6: _6,
        7: _7,
        8: _8,
        9: _9,
        10: _10,
        11: _11,
        12: _12,
        13: _13,
        14: _14,
        15: _15,
        16: _16,
        17: _17,
        18: _18
    }
    
    return (
        <div className="lobby-blog">
            <LobbyTableHeader title="Latest Updates" url="/blog" icon="pen-alt" />
            <ul className="lobby-blog-table">
                {blogs.map((blog, i) => {
                    return (
                        <li key={i}>
                            <Link to={`/blog/${getYear(blog.createdAt)}/${blog.id}`}>
                                <div className="blog-image">
                                    {/* <img src={window[`_${blog.imageId}`]}/> */}
                                    <img src={imageUrls[blog.imageId]}/>
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