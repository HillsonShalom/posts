import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppResError } from "../types/extensions/appResErrorImp";

export const verifyToken = async (
    req : Request,
    res : Response,
    next: NextFunction
) => {
    try {
        const secret = process.env.SECRET_KEY
        const token = req.cookies.token 
        if (token) {
            req.token = jwt.verify(token, secret!) as IToken
        } else {
            throw new AppResError(401, "Login first!");
        }
        next();
    } catch(err) {
        const error = err as AppResError;
        res.status(error.statusCode || 500).send(error.message);
    }
}