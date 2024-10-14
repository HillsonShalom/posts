import mongoose, { Schema, Document } from "mongoose";

interface icomment extends IComment, Document {

}

export const commentSchema = new Schema<icomment>({
    body: {
        type: String,
        maxlength: 500
    },
    author: {
        type: Schema.Types.ObjectId,
        ref : 'User'
    }
}, { timestamps: true })