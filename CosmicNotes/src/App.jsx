import { useState, useEffect } from "react";
import { getNotes, computeAllEdges } from "./services/noteService";
import Note from "./components/Note";
import Header from "./components/Header";
import ListView from "./components/ListView";
import GraphView from "./components/GraphView";
import Popup from "./components/Popup";
import "./App.css";

function App() {
  const [popup, setPopup] = useState({ active: false, id: "NA" });
  const [view, setView] = useState("list");
  const [noteList, setNoteList] = useState([]);
  const [noteEdges, setEdges] = useState([]);
  const [nextID, setNextID] = useState(1);
  const [categories, setCategories] = useState(["Work", "Personal", "Study"]);

  useEffect(() => {
    getNotes().then((data) => {
      setNoteList(data);
      const nextID = data.length > 0 ? data[data.length - 1].id + 1 : 1;
      setNextID(nextID);
      computeAllEdges(data, 40).then((edges) => {
        setEdges(edges);
      });
    });
  }, []);
  return (
    <div>
      <Header setPopup={setPopup} view={view} setView={setView} />
      {popup.active && (
        <Popup>
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
        </Popup>
      )}
      {view === "list" ? (
        <ListView noteList={noteList} setPopup={setPopup} />
      ) : (
        <GraphView
          noteList={noteList}
          noteEdges={noteEdges}
          setEdges={setEdges}
          setPopup={setPopup}
        />
      )}
    </div>
  );
}

export default App;
