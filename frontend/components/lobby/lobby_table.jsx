import React from "react";
import { connect } from "react-redux";
import { createGameModal, challengeFriendModal, playComputerModal } from "./../../actions/modal_actions";
import { withRouter } from "react-router-dom"
import { createMatch } from "./../../actions/match_actions";

class LobbyTable extends React.Component {
    constructor(props) {
        super(props)
        this.ensureLoggedIn = this.ensureLoggedIn.bind(this);
        this.createBotMatch = this.createBotMatch.bind(this);
    }

    ensureLoggedIn() {
        if (this.props.currentUser) {
            this.props.createGameModal();
        } else {
            this.props.history.push("/login");
        }
    }

    createBotMatch() {
        if (this.props.currentUser) {
            this.props.createMatch({
                blackPlayerId: this.props.currentUser.id,
                player2Name: "ai_player_0",
                matchType: "classical",
                whitePlayerId: null
            }).then(match => this.props.history.push(`matches/${match.match.id}`))
        } else {
            this.props.history.push("/login");
        }
    }

    render() {
        const { challengeFriendModal, playComputerModal} = this.props;
        return (
            <div className="lobby-table">
                <button onClick={this.ensureLoggedIn}>QUICK MATCH</button>
                <button onClick={challengeFriendModal}>PLAY WITH A FRIEND</button>
                <button onClick={playComputerModal}>PLAY WITH THE COMPUTER</button>
                <div className="lobby-table-info">
                    <p><span>1,000</span> players</p>
                    <p><span>1,000</span> games in play</p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    currentUser: state.entities.users[state.session.username]
})

const mapDispatchToProps = dispatch => ({
    createGameModal: () => dispatch(createGameModal()),
    challengeFriendModal: () => dispatch(challengeFriendModal()),
    createMatch: match => dispatch(createMatch(match)),
    playComputerModal: () => dispatch(playComputerModal())

})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LobbyTable))