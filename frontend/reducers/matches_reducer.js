import { RECEIVE_MATCHES, RECEIVE_MATCH} from "./../actions/match_actions";

const MatchesReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_MATCHES:
            action.matches.forEach
        case RECEIVE_MATCH:

        default:
            return state;
    }
}

export default MatchesReducer;