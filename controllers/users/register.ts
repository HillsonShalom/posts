import { Request, Response } from "express";

export default async (
    req: Request<any, any, IUser>,
    res: Response
) => {
    try {
        // func()
    } catch(err) {
        const error = err as AppResError
        res.status(error.statusCode || 500).json({ name: error.name, message: error.message });
    }
}

const create = () => {}