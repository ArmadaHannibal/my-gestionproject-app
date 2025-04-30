import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://nathanmpoussicka:uZAUQkRdFoVEQTdM@gestionproject.utcmoqd.mongodb.net/?retryWrites=true&w=majority&appName=Gestionproject';

if (!MONGO_URI) {
    throw new Error('Please add your Mongo URI to .env.local');
}
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}
console.log(MONGO_URI);

async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectToDatabase;
