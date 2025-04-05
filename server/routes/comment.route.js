import express from 'express'
import { addcomment, commentCount, deleteComment, getAllComments, getComments } from '../controller/comment.controller.js'
// import { authenticate } from '../middleware/authenticate.js'

const CommentRouote = express.Router()

CommentRouote.post('/add', addcomment)
CommentRouote.get('/get/:blogid', getComments)
CommentRouote.get('/get-count/:blogid', commentCount)
CommentRouote.get('/get-all-comment', getAllComments)
CommentRouote.delete('/delete/:commentid', deleteComment)


export default CommentRouote