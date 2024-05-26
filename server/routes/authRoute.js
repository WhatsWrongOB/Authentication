import express from 'express'
import { register, login, google, logout, resetPassword } from '../controllers/authController.js'

const authRouter = express.Router()

authRouter.post('/login', login)
authRouter.post('/register', register)
authRouter.post('/google', google)
authRouter.get('/logout', logout)
authRouter.patch('/reset/:id', resetPassword)

export default authRouter
