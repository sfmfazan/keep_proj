import React, { useState } from "react";
import "./Note.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from '@mui/icons-material/Save';

const Note = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(props.title);
  const [editedContent, setEditedContent] = useState(props.content);

  const handleClick = () => {
    props.deleteNote(props.id);
  };

  const handleEdit = () => {
    props.editNote(props.id, editedTitle, editedContent);
    setIsEditing(false);
  };

  const generateEmoji = (text) => {
    const emojis = ['😊', '📝', '📌', '📎', '📒', '✏️', '🗒️', '🖊️', '✉️'];
    const index = text.length % emojis.length;
    return emojis[index];
  };

  return (
    <div className="note">
      {props.category && <p className="category">Category: {props.category}</p>}
      {props.reminder && <p className="reminder">Reminder: {props.reminder}</p>}
      <p className="emoji">{generateEmoji(props.title)}</p>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          ></textarea>
          <button onClick={handleEdit}>
  <SaveIcon />
</button>
        </div>
      ) : (
        <div>
          <h1>{props.title}</h1>
          <p>{props.content}</p>
          <button onClick={() => setIsEditing(true)}>
            <EditIcon />
          </button>
          <button onClick={handleClick}>
            <DeleteIcon />
          </button>
        </div>
      )}
    </div>
  );
};

export default Note;





