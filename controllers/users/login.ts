import { AppResError } from "../../types/extensions/appResErrorImp";
import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { iuserDocument, User } from "../../types/models/userSchema";


export default async (
    req: Request<any, any, Partial<IUser>>,
    res: Response
) => {
    try {
        const body = req.body
        if (!body.username || !body.password) throw new AppResError(400, "please enter username and password");
        const user = await User.findOne({ username: body.username });
        if (!user || !(await checkPassword(body.password, user.password))) throw new AppResError(401, "username or password are wrong!");
        // here we will send a cookie
        const token = jwt.sign({ name: user.username, id: user.id, role: 'user' }, process.env.SECRET_KEY!, { expiresIn: '1h' });
        res.cookie('token', token);
        res.status(200).send('correct entrence');
    } catch(err) {
        const error = err as AppResError
        res.status(error.statusCode || 500).json({ name: error.name, message: error.message });
    }
}

const checkPassword = async (data: string, encrypted: string): Promise<boolean> => {
    return await bcrypt.compare(data, encrypted);
}