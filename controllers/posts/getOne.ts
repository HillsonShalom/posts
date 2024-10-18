import { Request, Response } from "express";
import { Post } from "../../types/models/postSchema";
import { AppResError } from "../../types/extensions/appResErrorImp";

export default async (
    req: Request<{id: string}>,
    res: Response
) => {
    try {
        const id = req.params.id;
        console.log(id);
        const post = await Post.findById(id).populate('author', 'username -_id').exec();
        if (!post) throw new AppResError(404, "post not found!");
        res.json(post);
    } catch(err) {
        const error = err as AppResError
        res.status(error.statusCode || 500).json({ name: error.name, message: error.message });
    }
}