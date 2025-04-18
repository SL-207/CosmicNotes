import { useState } from "react";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Check } from "@mui/icons-material";
import { computeNewEdges } from "../services/noteService";
import NoteCategory from "./NoteCategory";
import styles from "./note.module.css";

const buttonStyle = (backgroundColor) => ({
  backgroundColor: backgroundColor,
  color: "#E2E8F0",
  margin: "5px",
  fontSize: "0.75em",
});

export default function Note({
  popup,
  setPopup,
  noteList,
  setNoteList,
  categories,
  nextID,
  setNextID,
  noteEdges,
  setEdges,
}) {
  const [note, setNote] = useState(
    noteList.filter((noteObj) => noteObj.id == popup.id)[0] || {}
  );
  const resetEdges = noteEdges.filter(
    // remove edges if before update
    (edge) => !edge.includes(popup.id.toString())
  );

  const saveNote = async () => {
    let noteToSave;
    setPopup({ active: false });
    if (popup.id === 0) {
      noteToSave = {
        ...note,
        id: nextID,
        createdAt: new Date(),
      };
      setNextID(nextID + 1);
      setNoteList([...noteList, noteToSave]);
    } else {
      setNoteList(
        // replace with updated note
        noteList.map((noteObj) => (noteObj.id == popup.id ? note : noteObj))
      );
      noteToSave = note;
    }
    if (!noteToSave.title) noteToSave.title = "Untitled";
    const newEdges = await computeNewEdges(noteToSave, noteList);
    console.log([...resetEdges, ...newEdges]);
    setEdges([...resetEdges, ...newEdges]);
  };
  return (
    // Set modal or popup with fixed pos and inset 0
    <div className={styles.popupBackdrop}>
      <div className={styles.popup}>
        <input
          className={styles.noteTitle}
          placeholder="Title"
          onChange={(e) => setNote({ ...note, title: e.target.value })}
          value={note.title}
        />
        <textarea
          className={styles.noteContent}
          placeholder="Write a note..."
          onChange={(e) => setNote({ ...note, content: e.target.value })}
          value={note.content}
        />
        <NoteCategory categories={categories} note={note} setNote={setNote} />
        <div className={styles.buttonsContainer}>
          <Button
            variant="contained"
            startIcon={<CloseIcon />}
            sx={buttonStyle("#2A3344")}
            onClick={() => setPopup({ active: false })}
          >
            Cancel
          </Button>
          <Button // Save note
            variant="contained"
            startIcon={<Check />}
            sx={buttonStyle("#6A4FD1")}
            onClick={() => {
              !note.content ? alert("Note cannot be empty!") : saveNote();
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
