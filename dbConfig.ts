import mongoose from "mongoose";

const connection = async () => {
    try {
        const connStr = process.env.CONNECTION_STRING;
        await mongoose.connect(connStr!)
        console.log('Successfully connected to MongoDB');
    } catch(err) {
        const error = err as Error;
        console.error(error.message)
    }
}

export default connection