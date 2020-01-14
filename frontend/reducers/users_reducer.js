import { RECEIVE_CURRENT_USER } from "../actions/session_actions";
import { RECEIVE_A_USER } from "../actions/users_actions";


const UsersReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return Object.assign({}, state, { [action.user.username]: action.user })
        case RECEIVE_A_USER:
            return Object.assign({}, state, { [action.payload.username]: action.payload })
        default:
            return state;
    }
}

export default UsersReducer;
