export const fetchForums = () => (
    $.ajax({
        method: "GET",
        url: "/api/forums"
    })
)

export const fetchForum = forumId => (
    $.ajax({
        method: "GET",
        url: `/api/forums/${forumId}`
    })
)