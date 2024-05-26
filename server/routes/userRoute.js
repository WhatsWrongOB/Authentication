import express from 'express'
import { updateUserProfile, deleteUserProfile, getAllUsers } from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.get('/users', getAllUsers)
userRouter.patch('/:id', updateUserProfile)
userRouter.delete('/:id', deleteUserProfile)


export default userRouter