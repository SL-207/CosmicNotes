import styles from "./listitem.module.css";

function ListItem({ note, setPopup }) {
  console.log(note.category)
  return (
    <div className={styles.listItem} onClick={() => setPopup({active: true, id: note.id})}>
      <div className={styles.titleContainer}>
        <h2>{note.title}</h2>
        <p>{note.category}</p>
      </div>
      <p>{note.content}</p>
      <p className={styles.date}>
        {note.createdAt.toLocaleString().split(",")[0]}
      </p>
    </div>
  );
}

export default ListItem;
