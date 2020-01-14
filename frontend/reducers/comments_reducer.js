import { RECEIVE_A_POST, RECEIVE_A_COMMENT, RECEIVE_COMMENTS } from "../actions/forum_actions";

const CommentsReducer = (state = {}, action) => {
    Object.freeze(state);
    let nextState;
    switch (action.type) {
        case RECEIVE_A_POST:
            nextState = {};
            action.payload.comments.forEach(comment => {
                nextState[comment.id] = comment
            }) 
            return nextState;
        case RECEIVE_COMMENTS:
            nextState = {};
            action.payload.forEach(comment => {
                nextState[comment.id] = comment
            }) 
            return nextState;
        case RECEIVE_A_COMMENT:
            nextState = Object.assign({}, state);
            nextState[action.comment.id] = action.comment;
            return nextState;
        default: 
            return state;
    }
}

export default CommentsReducer
