import { Request, Response } from "express";
import { ipostDocument, Post } from "../../types/models/postSchema";
import { AppResError } from "../../types/extensions/appResErrorImp";

export default async (
    req: Request<any, any, Body>,
    res: Response
) => {
    try {
        const updated = await update(req.body);
        res.status(200).json(updated);
    } catch(err) {
        const error = err as AppResError
        res.status(error.statusCode || 500).json({ name: error.name, message: error.message });
    }
}

const update = async (body: Body): Promise<ipostDocument> => {
    const relevant = await Post.findById(body.id);
    if (!relevant) throw new AppResError(404, "Post not found!");
    if (!body.title && !body.content) throw new AppResError(400, "Enter something to change!");
    relevant.title   = body.title   ? body.title   : relevant.title  ;
    relevant.content = body.content ? body.content : relevant.content;
    return await relevant.save();
}



type Body = Partial<IPost> & { id: string }