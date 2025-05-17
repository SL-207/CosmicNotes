import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Check } from "@mui/icons-material";
import { computeNewEdges, saveNote } from "../services/noteService";

const buttonStyle = (backgroundColor) => ({
  backgroundColor: backgroundColor,
  color: "#E2E8F0",
  margin: "5px",
  fontSize: "0.75em",
});

function NoteSaving({
  popup,
  setPopup,
  noteList,
  setNoteList,
  note,
  originalNote,
  nextID,
  setNextID,
  setEdges,
  resetEdges,
}) {
  const ensureFields = (note) => {
    if (!note.title || note.title.trim() === "") {
      note.title = "Untitled";
    }
    if (!note.category) {
      note.category = null;
    }
    return note;
  };
  const save = async () => {
    let noteToSave;
    let createdAt = new Date().toLocaleString().split(",")[0];
    setPopup({ active: false });
    if (popup.id === "NA") {
      noteToSave = {
        ...note,
        id: nextID,
        createdAt: createdAt,
      };
      noteToSave = ensureFields(noteToSave);
      await saveNote(noteToSave, "add");
      setNextID(nextID + 1);
      setNoteList([...noteList, noteToSave]);
    } else {
      noteToSave = note;
      noteToSave = ensureFields(noteToSave);
      setNoteList(
        // replace with updated note
        noteList.map((noteObj) =>
          noteObj.id == popup.id ? noteToSave : noteObj
        )
      );
      await saveNote(noteToSave, "update");
    }
    if (originalNote.content !== noteToSave.content) {
      const newEdges = await computeNewEdges(noteToSave, noteList);
      console.log([...resetEdges, ...newEdges]);
      setEdges([...resetEdges, ...newEdges]);
    }
  };
  return (
    <div
      style={{ display: "flex", justifyContent: "right", marginTop: "20px" }}
    >
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
          !note.content ? alert("Note cannot be empty!") : save();
        }}
      >
        Save
      </Button>
    </div>
  );
}

export default NoteSaving;
