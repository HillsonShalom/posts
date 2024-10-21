import { NextFunction, Request, Response } from "express";
import { Post } from "../types/models/postSchema";
import { AppResError } from "../types/extensions/appResErrorImp";
import mongoose from "mongoose";

export const deletePostAuthorization = async (
    req : Request<{ id: string }>,
    res : Response,
    next: NextFunction
) => {
    try {
        if (req.params.id.length != 24) throw new AppResError(400, "Wrong id!");
        const found = await Post.findById(req.params.id).select('author -_id').populate('author', '_id').exec();
        if (!found) throw new AppResError(404, "Post not found");
        const author = found as authorIdExpected;
        const id = author!.author!._id.toString();
        if (id !== req.token!.id) throw new AppResError(403, "you haven't the authorization to delete this post!");
        console.log("Authorization succeeded");
        next();
    } catch(err) {
        const error = err as AppResError;
        console.error(error.message);
        res.status(error.statusCode || 500).send(error.message);
    }
}


export const updatePostAuthorization = async (
    req : Request<any, any, Body>,
    res : Response,
    next: NextFunction
) => {
    try {
        if (req.body.id.length != 24) throw new AppResError(400, "Wrong id!");
        const found = await Post.findById(req.body.id).select('author -_id').populate('author', '_id').exec();
        if (!found) throw new AppResError(404, "Post not found");
        const author = found as authorIdExpected;
        const id = author!.author!._id.toString();
        if (id !== req.token!.id) throw new AppResError(403, "you haven't the authorization to delete this post!");
        console.log("Authorization succeeded");
        next();
    } catch(err) {
        const error = err as AppResError;
        console.error(error.message);
        res.status(error.statusCode || 500).send(error.message);
    }
}

type authorIdExpected = { author?: { _id: string } }
type Body = Partial<IPost> & { id: string }