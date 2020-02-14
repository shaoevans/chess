import { combineReducers } from "redux";
import ModalReducer from "./modal_reducer";
import LobbyMatchReducer from "./lobby_match_reducer";

export default combineReducers({
    modal: ModalReducer,
    lobbyMatch: LobbyMatchReducer
})