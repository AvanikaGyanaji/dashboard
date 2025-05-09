import express from "express";
import Project from "../models/create.js";

const router = express.Router();

// Create a new project
router.post("/create", async (req, res) => {
    try {
        const { projectName, rosDistribution } = req.body;

        const newProject = new Project({
            projectName,
            rosDistribution
        });

        await newProject.save();
        return res.status(200).json({ success: true, message: "Project created", project: newProject });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: "Error creating project" });
    }
});

// Get all projects
router.get("/", async (req, res) => {
    try {
        const projects = await Project.find();
        return res.status(200).json({ success: true, projects });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: "Error fetching projects" });
    }
});

// Delete a project
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await Project.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: "Project deleted" });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: "Error deleting project" });
    }
});

export default router;
