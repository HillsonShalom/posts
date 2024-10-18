import { Request, Response } from "express";
import { AppResError } from "../../types/extensions/appResErrorImp";
import { User } from "../../types/models/userSchema";

export default async (
    req: Request,
    res: Response
) => {
    try {
        if (!req.token) throw new AppResError(401, 'login first');
        const result = await User.findByIdAndDelete(req.token.id);
        res.clearCookie('token');
        res.json({ message: "successfully deleted this account", user: result });
    } catch(err) {
        const error = err as AppResError
        res.status(error.statusCode || 500).json({ name: error.name, message: error.message });
    }
}