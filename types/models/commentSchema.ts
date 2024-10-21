import mongoose, { Schema, Document } from "mongoose";

export interface icommentDocument extends IComment, Document {

}

export const commentSchema = new Schema<icommentDocument>({
    body: {
        type: String,
        maxlength: 500
    },
    author: {
        type: Schema.Types.ObjectId,
        ref : 'User'
    }
}, { timestamps: true, id: true })