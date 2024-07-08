import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set("strictQuery", true);

    if (isConnected) {
        console.log("MongoDB is already connected");
        return;
    }

    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
        throw new Error('MONGODB_URI environment variable is not defined');
    }

    try {
        await mongoose.connect(mongoUri, {
            dbName: "promts-web",
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        isConnected = true;
        console.log("MongoDB connected");
    } catch (error) {
        console.log("Failed to connect to MongoDB", error);
    }
}
