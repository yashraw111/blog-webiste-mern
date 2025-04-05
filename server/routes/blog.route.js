import express from 'express'
import { addBlog, deleteBlog, editBlog, getAllBlogs, getBlog, getBlogByCategory, getRelatedBlog, search, showAllBlog, updateBlog } from '../controller/blog.controller.js'
import upload from '../config/multer.js'

const BlogRoute = express.Router()

BlogRoute.post('/add', upload.single('file'), addBlog)
BlogRoute.get('/edit/:blogid', editBlog)
BlogRoute.put('/update/:blogid', upload.single('file'), updateBlog)
BlogRoute.delete('/delete/:blogid', deleteBlog)
BlogRoute.get('/get-all', showAllBlog)

BlogRoute.get('/get-blog/:slug', getBlog)
BlogRoute.get('/get-related-blog/:category/:blog', getRelatedBlog)
BlogRoute.get('/get-blog-by-category/:category', getBlogByCategory)
BlogRoute.get('/search', search)

BlogRoute.get('/blogs', getAllBlogs)

export default BlogRoute