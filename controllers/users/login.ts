import { Request, Response } from "express";

export default async (
    req: Request<any, any, Partial<IUser>>,
    res: Response
) => {
    try {

    } catch(err) {
        const error = err as AppResError
        res.status(error.statusCode || 500).json({ name: error.name, message: error.message });
    }
}