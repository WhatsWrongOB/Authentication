import mongoose from 'mongoose';
import userModel from '../models/userModel.js'
import errorHandler from '../utils/error.js'


export const getAllUsers = async (req, res, next) => {
    try {
        const users = await userModel.find()

        return res.status(200).json({
            users
        });
    } catch (error) {
        next(error)
    }
}

export const updateUserProfile = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { username, email, profilePicture } = req.body

        if (!mongoose.Types.ObjectId.isValid(id)) {
            next(errorHandler(400, `No post with id ${id}`))
        }
        await userModel.findByIdAndUpdate(id,
            { username, email, profilePicture, _id: id }, { new: true })

        return res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
        });
    } catch (error) {
        next(error)
    }
}

export const deleteUserProfile = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            next(errorHandler(400, `No post with id ${id}`))
        }

        const findUser = await userModel.findById(id)

        if (findUser.isAdmin) {
            return res.status(200).json({
                success: false,
                message: 'Admin should not be deleted ',
            });
        }

        await userModel.findByIdAndDelete(id)
        return res.status(200).json({
            success: true,
            message: 'User deleted successfully',
        });
    } catch (error) {
        next(error)
    }
}