import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

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
            res.status(401).send("Login first!")
        }
        next();
    } catch(err) {
        const error = err as Error;
        res.status(500).send(error.message);
    }
}