import express from 'express'
import { contact } from '../controllers/contactController.js'

const contactRouter = express.Router()

contactRouter.post('/', contact)

export default contactRouter