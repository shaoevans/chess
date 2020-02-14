import { RECEIVE_LOBBY_MATCH } from "../actions/match_actions";

const LobbyMatchReducer = (state = null, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_LOBBY_MATCH:
            return action.match
        default: 
            return state;
    }
}

export default LobbyMatchReducer;