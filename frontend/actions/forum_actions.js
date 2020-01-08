import * as ForumAPIUtil from "./../util/forum_api_util"

export const RECEIVE_ALL_FORUMS = "RECEIVE_ALL_FORUMS"
export const RECEIVE_A_FORUM = "RECEIVE_A_FORUM"
export const RECEIVE_A_POST = "RECEIVE_A_POST"

const receiveAllForums = forums => ({
    type: RECEIVE_ALL_FORUMS,
    forums
})

const receiveAForum = forum => {
    return {
    type: RECEIVE_A_FORUM,
    forum
}}

const receiveAPost = post => ({
    type: RECEIVE_A_POST,
    post
})

export const fetchAllForums = () => dispatch => ForumAPIUtil.fetchForums()
    .then(forums => dispatch(receiveAllForums(forums)));

export const fetchForum = forumId => dispatch => ForumAPIUtil.fetchForum(forumId)
    .then(forum => dispatch(receiveAForum(forum)));

export const createPost = post => dispatch => ForumAPIUtil.createPost(post)
    .then(post => dispatch(receiveAPost(post)));

