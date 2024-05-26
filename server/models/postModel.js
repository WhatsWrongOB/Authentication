import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    heroPicture: {
        type: String,
    }
}, {
    timestamps: true
}
)

const postModel = mongoose.model('Post', postSchema)
export default postModel
