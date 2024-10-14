import mongoose, { Schema, Document } from "mongoose";

interface ipost extends IPost, Document {

}

export const userSchema = new Schema<ipost>({
    
}, { timestamps: true })