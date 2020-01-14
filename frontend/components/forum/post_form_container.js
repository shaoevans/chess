import { connect } from "react-redux";
import { createPost, fetchForum } from "../../actions/forum_actions";
import PostForm from "./post_form";

const mapStateToProps = (state, ownProps) => ({
    forum: state.entities.forums[ownProps.match.params.forumId],
    currentUser: state.entities.users[state.session.username]
})

const mapDispatchToProps = dispatch => ({
    fetchForum: forumId => dispatch(fetchForum(forumId)),
    createPost: post => dispatch(createPost(post))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
