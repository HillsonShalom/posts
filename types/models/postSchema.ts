import mongoose, { Schema, Document } from "mongoose";
import { commentSchema } from "./commentSchema";

export interface ipostDocument extends IPost, Document {

}

export const postSchema = new Schema<ipostDocument>({
    author: {
        type: Schema.Types.ObjectId,
        ref : 'User'
    },
    title: {
        type: String,
        maxlength: [400, "too long..."]
    },
    content: {
        type: String
    },
    comments: {
        type: [commentSchema]
    }
}, { timestamps: true });

export const Post = mongoose.model('Post', postSchema);