import mongoose from "mongoose";

// Function to establish a connection to the MongoDB database...
const connectDB = async () => {
    mongoose.connection.on('connected', () => console.log('Database Connected...'));
    await mongoose.connect(`${process.env.MONGODB_URI}/mern-auth`);
};

export default connectDB;