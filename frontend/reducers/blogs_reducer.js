import { RECEIVE_ALL_BLOGS, RECEIVE_A_BLOG, RECEIVE_BLOGS_BY_YEAR } from "./../actions/blog_actions";

const BlogsReducer = (state = {}, action ) => {
    Object.freeze(state);
    let nextState;
    switch(action.type) {
        case RECEIVE_ALL_BLOGS:
            nextState = Object.assign({}, state);
            action.payload.blogs.forEach(blog => {
                nextState[blog.id] = blog
            }) 
            nextState[action.payload.latestBlog.id] = action.payload.latestBlog;
            return nextState;
        case RECEIVE_BLOGS_BY_YEAR:
            nextState = Object.assign({}, state);
            action.payload.blogs.forEach(blog => {
                nextState[blog.id] = blog
            }) 
            nextState[action.payload.latestBlog.id] = action.payload.latestBlog;
            return nextState;
        case RECEIVE_A_BLOG:
            nextState = Object.assign({}, state);
            nextState[action.blog.id] = action.blog;
            return nextState;
        default:
            return state;
    }
}

export default BlogsReducer;