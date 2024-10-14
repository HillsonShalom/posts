import mongoose, { Schema, Document } from "mongoose";

interface iuser extends IUser, Document {

}

export const userSchema = new Schema<iuser>({
    username: {
        type: String,
        maxlength: 45,
        validate: {
            validator: (name) => /^[a-zA-Z\s-']+$/.test(name),
            message  : "Name can contain only alphabetical letters!"
        }
    },
    password: {
        type: String
    },
    email: {
        type: String,
        maxlength: 256,
        validate: {
            validator: (email: string) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email),
            message  : "Invalid Email!"
        }
    },
    age: {
        type: Number,
        max: 120,
        min: 1
    }
}, { timestamps: true })