import { combineReducers } from "redux";
import UsersReducer from "./users_reducer";
import ForumsReducer from "./forums_reducer";
import PostsReducer from "./posts_reducer";
import CommentsReducer from "./comments_reducer";
import BlogsReducer from "./blogs_reducer";

export default combineReducers({
    users: UsersReducer,
    forums: ForumsReducer,
    posts: PostsReducer,
    comments: CommentsReducer,
    blogs: BlogsReducer
})