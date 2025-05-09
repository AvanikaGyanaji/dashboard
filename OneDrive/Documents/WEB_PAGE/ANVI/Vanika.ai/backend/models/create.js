import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true
    },
    rosDistribution: {
        type: String,
        required: true,
        enum: ["Humble", "Foxy", "Jazzy"]  // Validation
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Project", ProjectSchema);
