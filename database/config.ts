import mongoose from "mongoose";

export const dbConnection = async (): Promise<void> => {
    try {

        const dbURL = process.env.DB_URL;
        if (!dbURL) {
            throw new Error("DB_URL must be defined");
        }

        await mongoose.connect(dbURL);

        console.log("Database connected");
        
    } catch (error) {
        console.log(error);
        throw new Error("Error connecting to database");
    }
    }