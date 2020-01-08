import { combineReducers } from "redux";
import UsersReducer from "./users_reducer";
import ForumsReducer from "./forums_reducer";

export default combineReducers({
    users: UsersReducer,
    forums: ForumsReducer
})