import ChessBoardSpectate from "./chess_board_spectate";
import { connect } from "react-redux";

const mapStateToProps = (state, ownProps) => ({
    currentUser: state.session.username ? state.entities.users[state.session.username] : { username: null}
})

export default connect(mapStateToProps)(ChessBoardSpectate);