import React from "react";
import { Link } from "react-router-dom";
import { getYear } from "./../../util/date_util";

const BlogIndexItem = ({blog}) => {
    return (
        <Link to={`/blog/${getYear(blog.createdAt)}/${blog.id}`} className="blog-index-item">
            <img className="blog-index-item-img" src={window[`_${blog.imageId}`]}/>
            <div className="blog-index-item-content">
                <h3>{blog.title}</h3>
                <span>{blog.description}</span>
            </div>
        </Link>
    )
}

export default BlogIndexItem;