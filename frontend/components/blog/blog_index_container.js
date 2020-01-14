import { connect } from "react-redux";
import { fetchBlogs } from "../../actions/blog_actions";
import BlogIndex from "./blog_index";


const mapStateToProps = state => ({
    blogs: Object.values(state.entities.blogs)
})
const mapDispatchToProps = dispatch => ({
    fetchBlogs: page => dispatch(fetchBlogs(page))
})

export default connect(mapStateToProps, mapDispatchToProps)(BlogIndex);