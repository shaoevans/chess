import * as ForumAPIUtil from "./../util/forum_api_util"

export const RECEIVE_ALL_FORUMS = "RECEIVE_ALL_FORUMS";
export const RECEIVE_A_FORUM = "RECEIVE_A_FORUM";
export const RECEIVE_A_POST = "RECEIVE_A_POST";
export const RECEIVE_A_COMMENT = "RECEIVE_A_COMMENT";
export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
export const RECEIVE_SEARCH_COMMENTS = "RECEIVE_SEARCH_COMMENTS"

const receiveAllForums = forums => ({
    type: RECEIVE_ALL_FORUMS,
    forums
})

const receiveAForum = payload => {
    return {
    type: RECEIVE_A_FORUM,
    payload
}}

const receiveAPost = payload => ({
    type: RECEIVE_A_POST,
    payload
})

const receiveAComment = comment => ({
    type: RECEIVE_A_COMMENT,
    comment
})

const receiveComments = payload => ({
    type: RECEIVE_COMMENTS,
    payload
})

const receiveSearchComments = payload => ({
    type: RECEIVE_SEARCH_COMMENTS,
    payload
})



export const fetchAllForums = () => dispatch => ForumAPIUtil.fetchForums()
    .then(forums => dispatch(receiveAllForums(forums)));

export const fetchForum = (forumId, page) => dispatch => ForumAPIUtil.fetchForum(forumId, page)
    .then(forum => dispatch(receiveAForum(forum)));

export const fetchPost = (postId, page) => dispatch => ForumAPIUtil.fetchPost(postId, page)
    .then(post => dispatch(receiveAPost(post)));

export const createPost = post => dispatch => ForumAPIUtil.createPost(post)
    .then(post => dispatch(receiveAPost(post)));

export const fetchLatestComments = () => dispatch => ForumAPIUtil.fetchComments(1)
    .then(payload => dispatch(receiveComments(payload)))

export const fetchSearchComments = search => dispatch => ForumAPIUtil.fetchSearchComments(search)
    .then(payload => dispatch(receiveSearchComments(payload)));

export const createComment = comment => dispatch => ForumAPIUtil.createComment(comment)
    .then(comment => dispatch(receiveAComment(comment)));

export const updateComment = comment => dispatch => ForumAPIUtil.updateComment(comment)
    .then(comment => dispatch(receiveAComment(comment)));

