import mongoose from "mongoose";

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(
            'mongodb+srv://avanikagyanaji:Anv%21AvGy1%23@cluster-1.kn8g7sm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-1'
        );
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB", error.message);
    }
};
export default connectToMongoDB; 