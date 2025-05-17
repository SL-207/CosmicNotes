import styles from "./notecategory.module.css";

function NoteCategory({ categories, note, setNote }) {
  return (
    <>
      <div className={styles.noteCategory}>Category:</div>
      {categories.map((category) => (
        <button
          className={styles.categoryButton}
          onClick={() =>
            !note.category || note.category !== category
              ? setNote({ ...note, category: category })
              : setNote({ ...note, category: null })
          }
          style={
            note.category === category
              ? { backgroundColor: "#6A4FD1" }
              : { backgroundColor: "#1A2234" }
          }
        >
          {category}
        </button>
      ))}
    </>
  );
}

export default NoteCategory;
