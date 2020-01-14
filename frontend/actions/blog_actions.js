export const RECEIVE_ALL_BLOGS = "RECEIVE_ALL_BLOGS";
export const RECEIVE_A_BLOG = "RECEIVE_A_BLOG";
export const RECEIVE_BLOGS_BY_YEAR = "RECEIVE_BLOGS_BY_YEAR"
import *  as BlogAPIUtil from "./../util/blog_api_util";

const receiveAllBlogs = payload => ({
    type: RECEIVE_ALL_BLOGS,
    payload
})

const receiveABlog = blog => ({
    type: RECEIVE_A_BLOG,
    blog
})

const receiveBlogsByYear = payload => ({
    type: RECEIVE_BLOGS_BY_YEAR,
    payload
})

export const fetchBlogs = page => dispatch => BlogAPIUtil.fetchBlogs(page)
    .then(payload => dispatch(receiveAllBlogs(payload)));

export const fetchBlogsByYear = (page, year) => dispatch => BlogAPIUtil.fetchBlogsByYear(page, year)
    .then(payload => dispatch(receiveBlogsByYear(payload)));

export const fetchBlog = blogId => dispatch => BlogAPIUtil.fetchBlog(blogId)
    .then(blog => dispatch(receiveABlog(blog)));

