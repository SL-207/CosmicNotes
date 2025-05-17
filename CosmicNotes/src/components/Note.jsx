import { useState, useEffect } from "react";
import NoteCategory from "./NoteCategory";
import NoteSaving from "./NoteSaving";
import styles from "./note.module.css";

function Note({
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
    const [originalNote, setOriginalNote] = useState(note);
    // Set only on mount
    useEffect(() => {
      setOriginalNote(note);
    }, []);

  const resetEdges = noteEdges.filter(
    // remove related edges if before update
    (edge) => !edge.includes(popup.id.toString())
  );
  return (
    <>
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
      <NoteSaving
        popup={popup}
        setPopup={setPopup}
        noteList={noteList}
        setNoteList={setNoteList}
        note={note}
        originalNote={originalNote}
        nextID={nextID}
        setNextID={setNextID}
        setEdges={setEdges}
        resetEdges={resetEdges}
      />
    </>
  );
}
export default Note;
