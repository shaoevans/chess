import { CLOSE_MODAL, CREATE_GAME_MODAL, CHALLENGE_FRIEND_MODAL, PLAY_COMPUTER_MODAL } from "../actions/modal_actions";

const ModalReducer = (state = null, action) => {
    Object.freeze(state);
    switch (action.type) {
        case CLOSE_MODAL:
            return null;
        case CREATE_GAME_MODAL:
            return CREATE_GAME_MODAL;
        case CHALLENGE_FRIEND_MODAL:
            return CHALLENGE_FRIEND_MODAL;
        case PLAY_COMPUTER_MODAL:
            return PLAY_COMPUTER_MODAL;
        default:
            return state;
    }
}

export default ModalReducer;