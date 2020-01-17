import { connect } from "react-redux";
import ChessBoard from "./chess_board";
import { fetchAMatch } from "./../../actions/match_actions";

const mapStateToProps = (state, ownProps) => ({
    chessMatch: state.entities.matches[ownProps.match.params.matchId],
    currentUser: state.session.username ? state.entities.users[state.session.username] : { username: null}
})

const mapDispatchToProps = dispatch => ({
    fetchAMatch: matchId => dispatch(fetchAMatch(matchId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChessBoard);