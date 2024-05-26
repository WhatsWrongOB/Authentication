import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    profilePicture: {
        type: String,
        default:"data:image/png;base64,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"
    }
}, {
    timestamps: true
}
)

const userModel = mongoose.model('User', userSchema)
export default userModel
