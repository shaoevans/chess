export const fetchForums = () => (
    $.ajax({
        method: "GET",
        url: "/api/forums"
    })
)

export const fetchForum = (forumId, page) => (
    $.ajax({
        method: "GET",
        url: `/api/forums/${forumId}`,
        data: { page }
    })
)

export const fetchPost = (postId, page) => (
    $.ajax({
        method: "GET",
        url: `/api/posts/${postId}`,
        data: { page }
    })
)


export const createPost = post => (
    $.ajax({
        method: "POST",
        url: `/api/posts`,
        data: { post },
    })
)

export const createComment = comment => (
    $.ajax({
        method: "POST",
        url: '/api/comments',
        data: { comment }
    })
)

export const fetchComments = page => (
    $.ajax({
        method: "GET",
        url: "/api/comments",
        data: { page }
    })
)
