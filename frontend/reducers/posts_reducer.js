import { RECEIVE_A_FORUM } from "./../actions/forum_actions";

const PostsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_A_FORUM:
            return Object.assign({}, state, action.posts)
        default:
            return state;
    }
}

export default PostsReducer;