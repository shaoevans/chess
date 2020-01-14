import React from "react";
import { formatDate } from "./../../util/date_util";

const BlogIndexShow = ({blog}) => {
    return (
        <div className="blog-header">
            <div className="blog-header">
                <div className="blog-title">
                    <div className="blog-title-top">
                        <span>Lichess Official Blog</span>
                        <i className="fas fa-wifi"></i>
                    </div>
                    <div className="blog-title-bottom">
                        <span>
                            {blog.title}
                        </span>
                    </div>
                </div>
                <div className="blog-header-bottom">
                    <div className="blog-header-bottom-top">
                        <span><i className="far fa-clock"></i> {formatDate(blog.createdAt)}</span>
                        <span><i className="fas fa-user"></i> {blog.author.username}</span>
                        <span><i className="fas fa-star"></i> {blog.category} </span>
                    </div>
                    <div className="blog-header-bottom-bottom">
                        {blog.description}
                    </div>
                </div>
            </div>
                <div className="blog-index-show-container">
                    <div className="blog-index-show-left">
                        <img src={window[`_${blog.imageId}`]}/>
                    </div>
                <div className="blog-index-show-right">
                    <span>
                        {blog.body.slice(0, 350) + "..."}
                    </span>
                    <button className="session-form-button">
                        <i className="fas fa-play"></i> CONTINUE READING THIS POST
                    </button>

                </div>

            </div>
        </div>

    )
}
export default BlogIndexShow