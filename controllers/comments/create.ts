import { Request, Response } from "express";
import { icommentDocument } from "../../types/models/commentSchema";
import { User } from "../../types/models/userSchema";
import mongoose from "mongoose";
import { Post } from "../../types/models/postSchema";
import { AppResError } from "../../types/extensions/appResErrorImp";

export default async (
    req: Request<any, any, Body>,
    res: Response
) => {
    try {
        await createComment(req.body, req.token!);
        res.status(201).send("Comment created successfully");
    } catch(err) {
        const error = err as AppResError
        res.status(error.statusCode || 500).json({ name: error.name, message: error.message });
    }
}

const createComment = async (comment: Body, token: IToken) => {
    const post = await Post.findById(comment.postId);
    if (!post) throw new AppResError(404, "Post not found!");
    post.comments?.push({ body: comment.body, author: new mongoose.Types.ObjectId(token.id) });
    post.save();
}

type Body = IComment & { postId: string }