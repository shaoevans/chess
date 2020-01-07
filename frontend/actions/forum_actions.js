import * as ForumAPIUtil from "./../util/forum_api_util"

export const RECEIVE_ALL_FORUMS = "RECEIVE_ALL_FORUMS"
export const RECEIVE_A_FORUM = "RECEIVE_A_FORUM"

const receiveAllForums = forums => ({
    type: RECEIVE_ALL_FORUMS,
    forums
})

const receiveAForum = forum => ({
    type: RECEIVE_A_FORUM,
    forum
})

export const fetchAllForums = () => dispatch => ForumAPIUtil.fetchForums()
    .then(forums => dispatch(receiveAllForums(forums)));

export const fetchForum = forumId => dispatch => ForumAPIUtil.fetchForum(forumId)
    .then(forum => dispatch(receiveAForum(forum)));