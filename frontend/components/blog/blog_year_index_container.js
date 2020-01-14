import { connect } from "react-redux";
import { fetchBlogsByYear } from "./../../actions/blog_actions";
import BlogYearIndex from "./blog_year_index";

const mapStateToProps = state => ({
    blogs: Object.values(state.entities.blogs)
})
const mapDispatchToProps = dispatch => ({
    fetchBlogsByYear: (page, year) => dispatch(fetchBlogsByYear(page, year))
})

export default connect(mapStateToProps, mapDispatchToProps)(BlogYearIndex);