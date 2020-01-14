import { connect } from "react-redux";
import { fetchPost, createComment } from "./../../actions/forum_actions"
import { fetchUser } from "./../../actions/users_actions"; 
import PostShow from "./post_show";

const mapStateToProps = (state, ownProps) => ({
    comments: Object.values(state.entities.comments),
    post: state.entities.posts[ownProps.match.params.postId],
    currentUser: state.entities.users[state.session.username],
})

const mapDispatchToProps = dispatch => ({
    fetchPost: (postId, page) => dispatch(fetchPost(postId, page)),
    fetchUser: username => () => dispatch(fetchUser(username)),
    createComment: comment => dispatch(createComment(comment))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostShow)