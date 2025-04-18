import { useState } from "react";
import Note from "./components/Note";
import Header from "./components/Header";
import ListView from "./components/ListView";
import GraphView from "./components/GraphView";
import "./App.css";

function App() {
  const [popup, setPopup] = useState({ active: false, id: 0 });
  const [view, setView] = useState("list");
  const [noteList, setNoteList] = useState([]);
  const [noteEdges, setEdges] = useState([]);
  const [nextID, setNextID] = useState(1);
  const [categories, setCategories] = useState(["Work", "Personal", "Study"]);
  return (
    <div>
      <Header setPopup={setPopup} view={view} setView={setView} />
      {popup.active && (
        <Note
          popup={popup}
          setPopup={setPopup}
          noteList={noteList}
          setNoteList={setNoteList}
          categories={categories}
          nextID={nextID}
          setNextID={setNextID}
          noteEdges={noteEdges}
          setEdges={setEdges}
        />
      )}
      {view === "list" ? (
        <ListView noteList={noteList} setPopup={setPopup} />
      ) : (
        <GraphView
          noteList={noteList}
          noteEdges={noteEdges}
          setPopup={setPopup}
        />
      )}
    </div>
  );
}

export default App;
