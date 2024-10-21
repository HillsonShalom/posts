import { AppResError } from "../../types/extensions/appResErrorImp";
import { Request, Response } from "express";
import { User } from "../../types/models/userSchema";

export default async (
    req: Request,
    res: Response
) => {
    try {
        const user = await User.findById(req.token!.id);
        if (!user) {
            res.clearCookie('token');
            throw new AppResError(500, 'wrong user!');
        }
        res.json(user);
    } catch(err) {
        const error = err as AppResError
        res.status(error.statusCode || 500).json({ name: error.name, message: error.message });
    }
}