import { RECEIVE_MATCHES, RECEIVE_MATCH} from "./../actions/match_actions";

const MatchesReducer = (state = {}, action) => {
    Object.freeze(state);
    let nextState;
    switch (action.type) {
        case RECEIVE_MATCHES:
            nextState = Object.assign({}, state);
            action.matches.forEach(match => {
                nextState[match.id] = match
            })
            return nextState;
        case RECEIVE_MATCH:
            nextState = Object.assign({}, state);
            nextState[action.match.id] = action.match;
            return nextState;
        default:
            return state;
    }
}

export default MatchesReducer;