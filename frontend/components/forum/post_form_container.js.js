import { connect } from "react-redux";
import { createPost } from "./../../actions/forum_actions";
import PostForm from "./post_form";

const mapStateToProps = (state, ownProps) => ({
    forum: state.entities.forums[ownProps.match.params.forumId],
    currentUser: state.entities.users[state.session.id]
})

const mapDispatchToProps = dispatch => ({
    createPost: post => dispatch(createPost(post))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostForm)
