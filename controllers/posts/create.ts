import { Request, Response } from "express";
import { ipostDocument, Post } from "../../types/models/postSchema";
import { User } from "../../types/models/userSchema";

export default async (
    req: Request<any, any, IPost>,
    res: Response
) => {
    try {
        if (!req.token) throw new AppResError(401, 'login first');
        const post = await createPost(req.body, req.token);
        res.json(post);
    } catch(err) {
        const error = err as AppResError
        res.status(error.statusCode || 500).json({ name: error.name, message: error.message });
    }
}

const createPost = async (post: IPost, token: IToken): Promise<ipostDocument>  => {
    const newPost = new Post({ ...post, author: token.id });
    const created = await newPost.save();
    const user = await User.findById(token.id);
    user?.posts?.push(created.id);
    await user?.save();
    return created;
}