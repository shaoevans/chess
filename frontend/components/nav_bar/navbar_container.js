import { connect } from "react-redux";
import NavBar from "./navbar";
import { logoutUser } from "./../../actions/session_actions"
import { fetchUserCurrentMatches } from "./../../actions/match_actions"
import { createGameModal } from "./../../actions/modal_actions"; 

const mapStateToProps = state => {
    const currentUser = state.entities.users[state.session.username]
    return {
    currentUser: currentUser,
    matches: currentUser ? Object.values(state.entities.matches).filter(match => {
            return (match.blackPlayerName === currentUser.username || match.whitePlayerName === currentUser.username)
        }) : []
    }
}

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logoutUser()),
    fetchUserCurrentMatches: userId => dispatch(fetchUserCurrentMatches(userId)),
    createGameModal: () => dispatch(createGameModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)