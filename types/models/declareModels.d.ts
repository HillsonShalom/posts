import mongoose from "mongoose"
import { userSchema } from "./userSchema"
import { postSchema } from "./postSchema"

declare global {
    export const User = mongoose.model('User', userSchema);
    export const Post = mongoose.model('Post', postSchema);
}
