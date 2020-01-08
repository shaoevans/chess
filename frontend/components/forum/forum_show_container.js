import { connect } from "react-redux";
import ForumShow from "./forum_show";
import { fetchForum } from "./../../actions/forum_actions";

const mapStateToProps = (state, ownProps) => {
    let forum;
    let posts;
    if (state.entities.forums[ownProps.match.params.forumId]) {
        forum = state.entities.forums[ownProps.match.params.forumId]
    } else {
        forum = { postIds: []}
    }
    if (state.entities.forums[ownProps.match.params.forumId]) {
        posts = state.entities.forums[ownProps.match.params.forumId]
        .postIds.map(postId => {
        state.entities.posts[postId]})
    } else {
        posts = []
    }
    return {
        forum: forum,
        posts: posts
    }
    
}

const mapDispatchToProps = dispatch => ({
    fetchForum: forumId => dispatch(fetchForum(forumId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ForumShow);
