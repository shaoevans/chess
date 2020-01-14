export const fetchBlogs = page => (
    $.ajax({
        method: "GET",
        url: "/api/blogs",
        data: { page }
    })
)


export const fetchBlogsByYear = (page, year) => (
    $.ajax({
        method: "GET",
        url: "/api/blogs",
        data: { page, year }
    })
)

export const fetchBlog = blogId => (
    $.ajax({
        method: "GET",
        url: `/api/blogs/${blogId}`
    })
)
