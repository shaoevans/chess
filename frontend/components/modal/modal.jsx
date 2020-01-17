import React from 'react';
import { closeModal, createGameModal, playComputerModal, challengeFriendModal } from "./../../actions/modal_actions";
import { CREATE_GAME_MODAL, PLAY_COMPUTER_MODAL, CHALLENGE_FRIEND_MODAL } from "./../../actions/modal_actions";
import CreateGameForm from "./create_game_form";
import ChallengeFriendForm from "./challenge_friend_form";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

const  Modal = ({ modal, closeModal, currentUser, history }) => {

    if (!modal) {
        return null;
    }

    let component;
    switch (modal) {
        case CREATE_GAME_MODAL:
            component = <CreateGameForm />;
            break;
        case PLAY_COMPUTER_MODAL:
            component = <PlayComputerForm />;
            break;
        case CHALLENGE_FRIEND_MODAL:
            component = <ChallengeFriendForm />
            break;
        default:
            return null;
    }
    return (
        <div className="modal-screen" onClick={closeModal}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                {component}
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    modal: state.ui.modal,
    currentUser: state.entities.users[state.session.username]
})

const mapDispatchToProps = dispatch => ({
    closeModal: () => dispatch(closeModal()),
    createGameModal: () => dispatch(createGameModal()),
    challengeFriendModal: () => dispatch(challengeFriendModal()),
    playComputerModal: () => dispatch(playComputerModal())
    
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Modal));
