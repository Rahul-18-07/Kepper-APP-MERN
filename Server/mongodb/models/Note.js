import mongoose from "mongoose";
const Note = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },


});
const NoteSchema = mongoose.model("Note", Note);
export default NoteSchema;