import { connect } from "react-redux";
import ForumShow from "./forum_show";
import { fetchForum } from "./../../actions/forum_actions";

const mapStateToProps = (state, ownProps) => {
    // let forum;
    // if (state.entities.forums[ownProps.match.params.forumId]) {
    //     forum = state.entities.forums[ownProps.match.params.forumId]
    // } else {
    //     // forum = { postIds: []}
    // }
    // forum = state.entities.forums[ownProps.match.params.forumId]
    return {
        forum: state.entities.forums[ownProps.match.params.forumId],
        loggedIn: !!state.session.username
    }
    
}

const mapDispatchToProps = dispatch => ({
    fetchForum: (forumId, page) => dispatch(fetchForum(forumId, page))
})

export default connect(mapStateToProps, mapDispatchToProps)(ForumShow);
