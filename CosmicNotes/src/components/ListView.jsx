import ListItem from "./ListItem";

function ListView({ noteList, setPopup }) {
  const sortedList = noteList.sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt)
  ); // newest item first
  return (
    <div>
      <h3
        style={{
          color: "#e2e8f0",
          margin: "15px 35px",
          fontFamily: "Courier New",
        }}
      >
        NOTES
      </h3>
      {sortedList.map((note) => (
        <ListItem note={note} setPopup={setPopup} />
      ))}
    </div>
  );
}

export default ListView;
