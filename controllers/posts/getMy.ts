import { Request, Response } from "express";
import { Post } from "../../types/models/postSchema";
import { User } from "../../types/models/userSchema";

export default async (
    req: Request,
    res: Response
) => {
    try {
        const myData = await User.findById(req.token!.id).select('posts').populate('posts', 'title content').exec();
        res.json(myData?.posts);
    } catch(err) {
        const error = err as AppResError
        res.status(error.statusCode || 500).json({ name: error.name, message: error.message });
    }
}