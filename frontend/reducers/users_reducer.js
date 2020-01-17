import { RECEIVE_CURRENT_USER } from "../actions/session_actions";
import { RECEIVE_A_USER, RECEIVE_USERS } from "../actions/users_actions";

const UsersReducer = (state = {}, action) => {
    Object.freeze(state);
    let nextState;
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return Object.assign({}, state, { [action.user.username]: action.user })
        case RECEIVE_A_USER:
            return Object.assign({}, state, { [action.payload.username]: action.payload })
        case RECEIVE_USERS:
            nextState = Object.assign({}, state);
            action.payload.forEach(user => {
                nextState[user.username] = user
            })
            return nextState;
        default:
            return state;
    }
}

export default UsersReducer;
