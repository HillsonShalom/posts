import { Request, Response } from "express";

export default async (
    req: Request,
    res: Response
) => {
    try {
        console.log('hye');
    } catch(err) {
        const error = err as AppResError
        res.status(error.statusCode || 500).json({ name: error.name, message: error.message });
    }
}