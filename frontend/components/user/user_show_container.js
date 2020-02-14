import { connect } from "react-redux";
import UserShow from "./user_show";
import { fetchUser } from "./../../actions/users_actions";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state, ownProps) => ({
    user: state.entities.users[ownProps.match.params.username],
    matches: Object.values(state.entities.matches).filter(match => match.blackPlayerName === ownProps.match.params.username || match.WhitePlayerName === ownProps.match.params.username)
})

const mapDispatchToProps = dispatch => ({
    fetchUser: username => dispatch(fetchUser(username))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserShow));