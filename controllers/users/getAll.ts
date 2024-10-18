import { Request, Response } from "express";
import { User } from "../../types/models/userSchema";

export default async (
    req: Request,
    res: Response
) => {
    try {
        const data = await User.find({});
        res.json(data);
    } catch(err) {
        const error = err as AppResError
        res.status(error.statusCode || 500).json({ name: error.name, message: error.message });
    }
}