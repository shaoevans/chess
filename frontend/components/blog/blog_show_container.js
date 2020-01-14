import { connect } from "react-redux";
import BlogShow from "./blog_show";
import { fetchBlog } from "./../../actions/blog_actions";

const mapStateToProps = (state, ownProps) => ({
    blog: state.entities.blogs[ownProps.match.params.blogId]
})

const mapDispatchToProps = dispatch => ({
    fetchBlog: blogId => dispatch(fetchBlog(blogId))
})

export default connect(mapStateToProps, mapDispatchToProps)(BlogShow);