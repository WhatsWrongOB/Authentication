import mongoose from "mongoose";
import postModel from "../models/postModel.js";

export const getAllPost = async (req, res, next) => {
    try {
        const post = await postModel.find();
        return res.status(200).json({
            success: true,
            post
        });
    } catch (error) {
        next(error);
    }
};

export const getPostById = async (req, res, next) => {
    try {
        const { id } = req.query;
        const post = await postModel.findById(id);
        return res.status(200).json({
            success: true,
            post
        });
    } catch (error) {
        next(error);
    }
};

export const createPost = async (req, res, next) => {
    try {
        const { title, content, author, heroPicture, comment } = req.body;

        const post = await postModel.create({
            title,
            content,
            author,
            heroPicture,
            comment
        });

        return res.status(201).json({
            success: true,
            message: 'Post created successfully',
        });
    } catch (error) {
        next(error);
    }
};

export const updatePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, content, author, heroPicture, comment } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(errorHandler(400, 'Invalid ID'));
        }

        const updatedPost = { title, content, author, heroPicture, comment };
        const updatedPostResult = await postModel.findByIdAndUpdate(id, updatedPost, { new: true });

        if (!updatedPostResult) {
            return next(errorHandler(404, 'Post not found'));
        }

        return res.status(200).json({
            success: true,
            message: 'Post updated successfully'
        });
    } catch (error) {
        next(error);
    }
};

export const deletePost = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(errorHandler(400, 'Invalid ID'));
        }

        const deletedPost = await postModel.findByIdAndDelete(id);

        if (!deletedPost) {
            return next(errorHandler(404, 'Post not found'));
        }

        return res.status(200).json({
            success: true,
            message: 'Post deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};
