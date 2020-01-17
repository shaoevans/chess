import { connect } from "react-redux";
import { fetchSearchComments } from "./../../actions/forum_actions";
import ForumSearch from "./forum_search";

const mapStateToProps = (state, ownProps) => ({
    comments: Object.values(state.entities.comments)
})

const mapDispatchToProps = dispatch => ({
    fetchSearchComments: search => dispatch(fetchSearchComments(search))
})

export default connect(mapStateToProps, mapDispatchToProps)(ForumSearch)