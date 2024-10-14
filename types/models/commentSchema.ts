import mongoose, { Schema, Document } from "mongoose";

interface icomment extends IComment, Document {

}

export const userSchema = new Schema<icomment>({
    body: {
        type: String,
        maxlength: 500
    }
}, { timestamps: true })