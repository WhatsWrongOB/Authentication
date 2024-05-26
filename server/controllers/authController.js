import userModel from '../models/userModel.js'
import errorHandler from '../utils/error.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'


export const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) return next(errorHandler(400, 'All fields are requried'))

        const userExist = await userModel.findOne({ email })

        if (userExist) return next(errorHandler(400, 'User already exist'))

        const hashedPassword = await bcryptjs.hash(password, 10)

        await userModel.create({
            username,
            email,
            password: hashedPassword
        })
        return res.status(200).json({
            success: true,
            message: 'Registration Successfull'
        })

    } catch (error) {
        next(error)
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) return next(errorHandler(400, 'All fields are requried'))

        const user = await userModel.findOne({ email })

        if (!user) return next(errorHandler(400, 'User not registere, Please register'))

        const validUser = await bcryptjs.compare(password, user.password)

        if (!validUser) return next(errorHandler(400, 'Invalid Email or password'))

        const token = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, process.env.JWT_SECRET_KEY)

        const { password: pass, ...userData } = user._doc

        res.status(200).cookie('token', token, {
            httpOnly: true,
        }).json({
            success: true,
            message: 'Logged In Successfull',
            userData
        })

    } catch (error) {
        next(error)
    }
}


export const google = async (req, res, next) => {
    try {
        const { username, email, googlePhotoUrl } = req.body;

        const user = await userModel.findOne({ email });

        if (user) {
            const token = jwt.sign({
                id: user._id,
                isAdmin: user.isAdmin
            }, process.env.JWT_SECRET_KEY);

            res.status(200).cookie('token', token, {
                httpOnly: true
            }).json(user);
        } else {
            const generatedPassword =
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);

            const hashedPassword = await bcryptjs.hash(generatedPassword, 10);

            const newUser = await userModel.create({
                username,
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl,
            });

            const token = jwt.sign({
                id: newUser._id,
                isAdmin: newUser.isAdmin
            }, process.env.JWT_SECRET_KEY);

            const { password: pass, ...userData } = newUser._doc;

            res.status(200).cookie('token', token, {
                httpOnly: true
            }).json(userData);
        }

    } catch (error) {
        next(error);
    }
};


export const logout = (req, res, next) => {
    try {
        res.clearCookie('token').status(200).json({
            success: true,
            message: 'Logged Out successfullly'
        })
    } catch (error) {
        next(error)
    }
}

export const resetPassword = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { curPass, newPass, rePass } = req.body;

        if (newPass !== rePass) return next(errorHandler(400, 'Password not match'))
        const user = await userModel.findById(id)

        if (!user) return next(errorHandler(400, 'User not found'))

        const isPasswordMatch = await bcryptjs.compare(curPass, user.password);

        if (!isPasswordMatch) {
            return next(errorHandler(401, 'Current password is incorrect'));
        }

        const hashedNewPassword = await bcryptjs.hash(newPass, 10)
        user.password = hashedNewPassword;

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Password reset successful'
        });

    } catch (error) {
        next(error)
    }
}