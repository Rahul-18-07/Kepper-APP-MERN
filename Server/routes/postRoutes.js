import express from "express";
import dotenv from "dotenv";
import Note from "../mongodb/models/Note.js";

dotenv.config();

const router = express.Router();

// Get all notes
router.get("/", async (req, res) => {
    try {
        const notes = await Note.find({});
        res.status(200).json({ success: true, data: notes });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Create a new note
router.post("/", async (req, res) => {
    try {
        const { title, content } = req.body;
        const newNote = await Note.create({ title, content });
        const notess = await Note.find({});
        res.status(200).json({ success: true, data: notess });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Delete a note
router.delete("/", async (req, res) => {
    try {
        const { id } = req.body;
        await Note.deleteOne({ _id: id });
        const notes = await Note.find({});
        res.status(200).json({ success: true, data: notes });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;