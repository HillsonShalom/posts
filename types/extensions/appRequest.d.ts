import { Request } from "express";

declare module 'express' {
    interface Request {
        token?: IToken;
    }
}

export {}