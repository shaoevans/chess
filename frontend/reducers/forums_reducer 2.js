import { RECEIVE_ALL_FORUMS } from "./../actions/forum_actions";


const ForumsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_ALL_FORUMS:
            return action.forums;
        default:
            return state;
    }
}

export default ForumsReducer;