import { Types } from 'mongoose'

declare global {
    interface IToken {
        name: string;
        id  : string;
        role: 'user' | 'admin';
    }

    interface IUser {
        username: string;
        password: string;
        email   : string;
        age     : number;
        posts?  : mongoose.Types.ObjectId[] | IPost[]
    }

    interface IComment {
        author?: Types.ObjectId;
        body   : string;
    }

    interface IPost {
        author?  : Types.ObjectId;
        title    : string;
        content  : string;
        comments?: IComment[];
    }
}

export {}