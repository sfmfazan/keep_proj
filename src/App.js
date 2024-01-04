import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import CreateNote from "./components/CreateNote/CreateNote";
import Note from "./components/Note/Note";
import Footer from "./components/Footer/Footer";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";

function App() {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);

  const addNote = (newNote) => {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const deleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note, index) => index !== id));
  };

  const editNote = (id, editedTitle, editedContent) => {
    setNotes((prevNotes) =>
      prevNotes.map((note, index) =>
        index === id ? { ...note, title: editedTitle, content: editedContent } : note
      )
    );
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);
    setSearchQuery(""); // Clear search query on toggle
  };

  return (
    <div className="App">
      <Header />
      <CreateNote addNote={addNote} />
      <div className="search-container">
        {isSearchActive && (
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={handleSearch}
          />
        )}
        <IconButton onClick={toggleSearch}>
          <SearchIcon />
        </IconButton>
      </div>
      <div className="notes-container">
        {filteredNotes.map((note, index) => (
          <Note
            key={index}
            id={index}
            title={note.title}
            content={note.content}
            category={note.category}
            reminder={note.reminder}
            deleteNote={deleteNote}
            editNote={editNote}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default App;
