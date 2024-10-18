import { Request, Response } from "express";
import { Post } from "../../types/models/postSchema";

export default async (
    req: Request,
    res: Response
) => {
    try {
        const data = await Post.find({}).populate('author', 'username -_id').exec();
        res.json(data);
    } catch(err) {
        const error = err as AppResError
        res.status(error.statusCode || 500).json({ name: error.name, message: error.message });
    }
}