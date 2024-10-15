import mongoose, { Schema, Document } from "mongoose";

export interface iuserDocument extends IUser, Document { }

export const userSchema = new Schema<iuserDocument>({
    username: {
        type: String,
        maxlength: 45,
        required: [true, 'username must be provided!'],
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
        max: [120, "too old..."],
        min: [1, "too young..."]
    },
    posts: {
        type: [Schema.Types.ObjectId],
        ref : 'Post'
    }
}, { timestamps: true });

// export const User = mongoose.model('User', userSchema);