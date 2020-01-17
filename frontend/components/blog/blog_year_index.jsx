import React from "react";
import BlogIndexItem from "./blog_index_item";
import debounce from "lodash.debounce";


class BlogYearIndex extends React.Component {
    constructor(props) {
        super(props)
        this.state = { page: 1, isLoading: true, hasMore: false }
    }


    componentDidMount() {
        this.props.fetchBlogsByYear(this.state.page, this.props.match.params.blogYear)
        // window.onscroll = debounce(() => {
        //     if ( this.state.isLoading || !this.state.hasMore) return;
        //     if (
        //       window.innerHeight + document.documentElement.scrollTop
        //       === document.documentElement.offsetHeight) {
        //         this.setState({ isLoading: true, page: this.state.page+1 }, () => { 
        //             this.props.fetchBlogsByYear(this.state.page, this.props.match.params.blogYear)
        //                 .then(
        //                     () => this.setState({ isLoading: false}),
        //                     () => this.setState({ isLoading: false, hasMore: false})
        //                 )
        //             }
        //         )
        //     }
        // } , 100);
        // this.props.fetchBlogsByYear(this.state.page, this.props.match.params.blogYear)
        //     .then(() => this.setState(this.state))
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