import mongoose from "mongoose";

const connectDB = (url) => {
    mongoose.set("strictQuery", true);

    mongoose.connect(url).then(() => console.log("Mongoose connnected!"))
    .catch((error) => console.error("Error connecting Mongoose: ", error));
};

export default connectDB;