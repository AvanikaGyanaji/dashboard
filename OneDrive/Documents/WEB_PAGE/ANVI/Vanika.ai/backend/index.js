import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import projectRoutes from "./routes/project.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/project", projectRoutes);

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/yourDatabaseName", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () => console.log("Server running on http://localhost:5000"));
})
.catch((err) => console.error(err));
