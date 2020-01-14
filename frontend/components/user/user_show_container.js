import { connect } from "react-redux";
import UserShow from "./user_show";
import { fetchUser } from "./../../actions/users_actions";

const mapStateToProps = (state, ownProps) => ({
    user: state.entities.users[ownProps.match.params.username]
})

const mapDispatchToProps = dispatch => ({
    fetchUser: username => dispatch(fetchUser(username))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserShow);