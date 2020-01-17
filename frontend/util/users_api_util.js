export const fetchUsers = page => (
    $.ajax({
        method: "GET",
        url: "/api/users",
        data: { page }
    })
)

export const fetchUser = username => (
    $.ajax({
        method: "GET",
        url: `/api/users/${username}`
    })
)