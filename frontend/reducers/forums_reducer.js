import { RECEIVE_ALL_FORUMS, RECEIVE_A_FORUM } from "./../actions/forum_actions";


const ForumsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_ALL_FORUMS:
            return action.forums;
        case RECEIVE_A_FORUM:
            return Object.assign({}, state, { [action.payload.forum.id]: action.payload.forum })
        default:
            return state;
    }
}

export default ForumsReducer;