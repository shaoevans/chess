import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from "./../actions/session_actions";

const SessionReducer = (state = { username: null }, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return { username: action.user.username }
        case LOGOUT_CURRENT_USER:
            return { username: null }
        default:
            return state;
    }
}

export default SessionReducer

