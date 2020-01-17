import { connect } from "react-redux";
import Lobby from "./lobby";
import { fetchLatestComments } from "./../../actions/forum_actions";
import { fetchBlogs } from "./../../actions/blog_actions";
import { fetchUserCurrentMatches } from "./../../actions/match_actions";
import { fetchAMatch } from "./../../actions/match_actions";
import { fetchUsers } from "./../../actions/users_actions";

const mapStateToProps = state => ({
    comments: Object.values(state.entities.comments),
    blogs: Object.values(state.entities.blogs).slice(0,3),
    currentUser: state.entities.users[state.session.username],
    users: Object.values(state.entities.users)
})

const mapDispatchToProps = dispatch => {
    return {
        fetchLatestComments: () => dispatch(fetchLatestComments()),
        fetchBlogs: () => dispatch(fetchBlogs(1)),
        fetchAMatch: () => dispatch(fetchAMatch(1)),
        fetchUsers: () => dispatch(fetchUsers(1))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Lobby)