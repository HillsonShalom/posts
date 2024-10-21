import { Request, Response } from "express";
import { Post } from "../../types/models/postSchema";

export default async (
    req: Request<{id: number}>,
    res: Response
) => {
    try {
        const page = req.params.id;
        const pack = 10;
        const data = await Post.find({}).sort({ createdAt: -1 }).skip((page -1) * pack).limit(pack).exec();
        res.json(data);
    } catch(err) {
        const error = err as AppResError
        res.status(error.statusCode || 500).json({ name: error.name, message: error.message });
    }
}