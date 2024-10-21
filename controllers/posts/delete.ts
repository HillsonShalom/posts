import { Request, Response } from "express";
import { Post } from "../../types/models/postSchema";

export default async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        const id = req.params.id;
        const del = await Post.findByIdAndDelete(id);
        res.sendStatus(204);
    } catch(err) {
        const error = err as AppResError
        res.status(error.statusCode || 500).json({ name: error.name, message: error.message });
    }
}