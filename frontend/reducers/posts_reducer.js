import { RECEIVE_A_FORUM, RECEIVE_A_POST} from "./../actions/forum_actions";

const PostsReducer = (state = {}, action) => {
    console.log(action)
    Object.freeze(state);
    let nextState;
    switch (action.type) {
        case RECEIVE_A_FORUM:
            nextState = {}
            action.payload.posts.forEach(post => {
                nextState[post.id] = post
            })
            return nextState;
        case RECEIVE_A_POST:
            nextState = Object.assign({}, state);
            nextState[action.payload.post.id] = action.payload.post;
            return nextState;
        default:
            return state;
    }
}

export default PostsReducer;