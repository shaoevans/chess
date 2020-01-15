import { connect } from "react-redux";
import Lobby from "./lobby";
import { fetchLatestComments } from "./../../actions/forum_actions";
import { fetchBlogs } from "./../../actions/blog_actions";
import { fetchUserCurrentMatches } from "./../../actions/match_actions";

const mapStateToProps = state => ({
    comments: Object.values(state.entities.comments),
    blogs: Object.values(state.entities.blogs).slice(0,3)
})

const mapDispatchToProps = dispatch => {
    return {
        fetchLatestComments: () => dispatch(fetchLatestComments()),
        fetchBlogs: () => dispatch(fetchBlogs(1)),
        fetchUserCurrentMatches: userId => dispatch(fetchUserCurrentMatches(userId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Lobby)