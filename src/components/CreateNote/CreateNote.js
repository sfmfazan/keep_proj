import React, { useState } from "react";
import Zoom from "@mui/material/Zoom";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import NotificationsIcon from "@mui/icons-material/Notifications";
import bellSound from "../sounds/bell2.wav"; 
import "./CreateNote.css";

const CreateNote = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [note, setNote] = useState({
    title: "",
    content: "",
    category: "",
    reminder: "",
    remindMe: false,
  });

  const expand = () => {
    setIsExpanded(true);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: fieldValue,
      };
    });
  };

  const playBellSound = () => {
    const audio = new Audio(bellSound);
    audio.play();
  };

  const submitNote = (event) => {
    event.preventDefault();
    if (note.remindMe && !note.reminder) {
      alert("Please select a reminder date/time.");
      return;
    }
    props.addNote(note);
    setNote({
      title: "",
      content: "",
      category: "",
      reminder: "",
      remindMe: false,
    });
    setIsExpanded(false);
  };

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            name="title"
            placeholder="Title"
            type="text"
            onChange={handleChange}
            value={note.title}
          />
        )}
        <textarea
          name="content"
          placeholder="Take a note.. "
          onClick={expand}
          onChange={handleChange}
          rows={isExpanded ? 3 : 1}
          value={note.content}
        />

        <select name="category" onChange={handleChange} value={note.category}>
          <option value="">Select Category</option>
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="study">Study</option>
        </select>

        <input
          type="datetime-local"
          name="reminder"
          onChange={handleChange}
          value={note.reminder}
          disabled={!note.remindMe}
        />

        {/* Bell icon and "Remind Me" text */}
        <label>
          <NotificationsIcon />
          Remind Me:
          <input
            type="checkbox"
            name="remindMe"
            checked={note.remindMe}
            onChange={handleChange}
            onClick={playBellSound} // Play the bell sound on click
          />
        </label>

        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
};

export default CreateNote;
