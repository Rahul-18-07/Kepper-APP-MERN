import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Fetch initial notes data
    const fetchNotes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/post", {
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.data.data;
        setNotes(data);
      } catch (error) {
        alert(error);
      }
    };

    fetchNotes();
  }, []);

  const addNote = async (newNote) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/post",
        newNote,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.data.data;
      setNotes(data);
    } catch (error) {
      alert(error);
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/v1/post`, { data: { id: id } }, {
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.data.data;
      setNotes(data);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((note) => (
        <Note
          key={note._id}
          id={note._id}
          title={note.title}
          content={note.content}
          onDelete={deleteNote}
        />
      ))}
      <Footer />
    </div>
  );
};

export default App;
