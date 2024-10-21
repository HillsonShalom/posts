import { NextFunction, Request, Response } from "express";
import { ipostDocument, Post } from "../types/models/postSchema";
import { AppResError } from "../types/extensions/appResErrorImp";
import { icommentDocument } from "../types/models/commentSchema";
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
    req : Request<any, any, postBody>,
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

export const deleteCommentAuthorization = async (
    req : Request<{ postId: string, id: string }>,
    res : Response,
    next: NextFunction
) => {
    try {
        if (req.params.id.length !== 24 || req.params.postId.length !== 24) throw new AppResError(400, "Wrong id!");
        const post = await Post.findById(req.params.postId);
        if (!post) throw new AppResError(404, "Post not found");
        
        
        // .select('author -_id').populate('author', '_id').exec();
        // const author = found as authorIdExpected;
        // const id = author!.author!._id.toString();
        // if (id !== req.token!.id) throw new AppResError(403, "you haven't the authorization to delete this post!");
        // console.log("Authorization succeeded");
        next()
    } catch(err) {
        const error = err as AppResError;
        console.error(error.message);
        res.status(error.statusCode || 500).send(error.message);
    }
}


export const updateCommentAuthorization = async (
    req : Request<any, any, postBody>,
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
type postBody = Partial<IPost> & { id: string }
type commentBody = Partial<IComment> & { id: string }

const stam = (a: ipostDocument) => {
    
}