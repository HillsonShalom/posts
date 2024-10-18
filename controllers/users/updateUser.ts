import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import { User } from "../../types/models/userSchema";
import { AppResError } from "../../types/extensions/appResErrorImp";

export default async (
    req: Request<any, any, Partial<IUser>>,
    res: Response
) => {
    try {
        if (!req.token) throw new AppResError(401, 'login first');
        if (req.body.password) req.body.password = await encryption(req.body.password);
        const user = await User.findByIdAndUpdate(req.token.id, req.body);
        res.json(user)
    } catch(err) {
        const error = err as AppResError
        res.status(error.statusCode || 500).json({ name: error.name, message: error.message });
    }
}

const encryption = async (password: string): Promise<string> => {
    const cycles = process.env.BCRYPT_CYCLES
    if (!cycles) throw new AppResError(500, "SERVER-ERROR: cycle env var not found")
    password = await bcrypt.hash(password, +cycles)
    return password;
}