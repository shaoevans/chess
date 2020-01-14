import React from "react";
import BlogIndexItem from "./blog_index_item";

class BlogYearIndex extends React.Component {
    constructor(props) {
        super(props)
        this.state = { page: 1 }
    }

    componentDidMount() {
        this.props.fetchBlogsByYear(this.state.page, this.props.match.params.blogYear)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.blogYear !== this.props.match.params.blogYear) {
            this.props.fetchBlogsByYear(this.state.page, this.props.match.params.blogYear)
        }
    }

    render() {
        const { blogs } = this.props;
        if (blogs.length) {
            return (
                <div className="blog-body">
                    <div className="blog-index-container">
                        <h2>Blog posts from {this.props.match.params.blogYear}</h2>
                        <div className="blog-index-body">
                                {blogs.slice(0, blogs.length-1).map(blog => {
                                    return <BlogIndexItem blog={blog} key={blog.id}/>
                                })}
                                    {/* {this.state.isLoading &&
                                        <div>Loading...</div>
                                    } */}
                        </div>
                    </div>
                </div>
            )
        } else {
            return null;
        }
    }
}

export default BlogYearIndex;