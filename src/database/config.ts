import mongoose from "mongoose"

export const dbConnection = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN!)
        console.log("Database online")

    } catch (error) {
        throw new Error(`Error in the database`)
    }
}
