import { connect } from "react-redux";
import ForumIndex from "./forum_index";
import { fetchAllForums } from "./../../actions/forum_actions"; 

const mapStateToProps = state => ({
    forums: Object.values(state.entities.forums)
})

const mapDispatchToProps = dispatch => ({
    fetchAllForums: () => dispatch(fetchAllForums())
})
export default connect(mapStateToProps, mapDispatchToProps)(ForumIndex)