import React from "react";
import { connect } from "react-redux";
import { createGameModal, challengeFriendModal, playComputerModal } from "./../../actions/modal_actions";
import { withRouter } from "react-router-dom"

class LobbyTable extends React.Component {
    constructor(props) {
        super(props)
        this.ensureLoggedIn = this.ensureLoggedIn.bind(this);
    }

    ensureLoggedIn() {
        if (this.props.currentUser) {
            this.props.createGameModal();
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
    playComputerModal: () => dispatch(playComputerModal())

})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LobbyTable))