import express from 'express'
import { doLike, likeCount } from '../controller/bloglike.controller.js'
// import { authenticate } from '../middleware/authenticate.js'

const BlogLikeRoute = express.Router()

BlogLikeRoute.post('/do-like', doLike)
BlogLikeRoute.get('/get-like/:blogid/:userid?', likeCount)

export default BlogLikeRoute