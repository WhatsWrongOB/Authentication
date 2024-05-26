import contactModel from '../models/contactModel.js'
import errorHandler from '../utils/error.js'

export const contact = async (req, res, next) => {
    try {
        const { username, email, message } = req.body;

        if (!username || !email || !message) {
            return next(errorHandler(400, 'All fields are requried'))
        }
        await contactModel.create({
            username,
            email,
            message
        })
        return res.status(200).json({
            success: true,
            message: 'Message sent successfully'
        })

    } catch (error) {
        next(error)
    }
}