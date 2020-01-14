import React from "react";
import { formatDate } from "./../../util/date_util";

class BlogShow extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchBlog(this.props.match.params.blogId)
            // .then(() => this.setState(this.state));
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.blogId !== prevProps.match.params.blogId) {
            this.props.fetchBlog(this.props.match.params.blogId)
                // .then(() => this.setState(this.state))
        }
    }

    render() {
        const { blog } = this.props;
        if (blog && blog.author) {
            return (
                <div className="blog-body">
                    <div className="blog-header">
                        <div className="blog-show-title">
                            <span>{blog.title}</span>
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
                        <div className="blog-show-body">
                            <img src={window[`_${blog.imageId}`]}/>
                            <span>
                                {blog.body}
                            </span>
                            <button className="session-form-button">
                                <i className="fas fa-comments"></i>
                                Discuss the blog post in the forum
                            </button>
                        </div>
                    </div>
                </div>
            )
        } else {
            return null;
        }
    }
}

export default BlogShow;