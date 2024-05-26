import express from 'express'
import { getAllPost, createPost, updatePost, deletePost, getPostById } from '../controllers/postController.js'

const postRouter = express.Router()

postRouter.get('/', getAllPost)
postRouter.get('/query', getPostById)
postRouter.post('/', createPost)
postRouter.patch('/:id', updatePost)
postRouter.delete('/:id', deletePost)



export default postRouter