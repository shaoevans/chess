import React from "react";
import BlogIndexItem from "./blog_index_item";
import BlogIndexShow from "./blog_index_show";
import debounce from "lodash.debounce";

class BlogIndex extends React.Component {
    constructor(props) {
        super(props)
        this.state = { page: 1, isLoading: false, hasMore: true }

    }

    componentDidMount() {
        window.onscroll = debounce(() => {
            if ( this.state.isLoading || !this.state.hasMore) return;
            if (
              window.innerHeight + document.documentElement.scrollTop
              === document.documentElement.offsetHeight) {
                this.setState({ isLoading: true, page: this.state.page+1 }, () => { 
                    this.props.fetchBlogs(this.state.page)
                        .then(
                            () => this.setState({ isLoading: false}),
                            () => this.setState({ isLoading: false, hasMore: false})
                        )
                    }
                )
            }
        } , 100);
        // window.addEventListener("onscroll", infiniteScroll())
        this.props.fetchBlogs(this.state.page)
            .then(() => this.setState(this.state))
    }

    render() {
        const { blogs } = this.props;
        if (blogs.length) {
            return (
                <div className="blog-body">
                    <BlogIndexShow blog={blogs[blogs.length-1]}/>
                    <div className="blog-index-container">
                        {/* <div> */}
                            <h2>Previous Blog Posts</h2>
                            <div className="blog-index-body">
                                {blogs.slice(0, blogs.length-1).map(blog => {
                                    return <BlogIndexItem blog={blog} key={blog.id}/>
                                })}
                                {this.state.isLoading &&
                                    <div>Loading...</div>
                                }
                            </div>
                        {/* </div> */}
                    </div>
                </div>
            )
        } else {
            return null;
        }
    }
    
}

export default BlogIndex;