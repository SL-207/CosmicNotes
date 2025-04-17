import { GraphCanvas } from "reagraph";
import styles from "./graphview.module.css";

function GraphView({ noteList, noteEdges, setPopup }) {
  const nodes = noteList.map((note) => ({
    id: note.id.toString(),
    label: note.title,
  }));
  const edges = noteEdges.map((edge) => ({
    source: edge.split("-")[0],
    target: edge.split("-")[1],
    id: edge,
  }));
  console.log(edges)
  return (
    <div className={styles.canvas}>
      <GraphCanvas
        nodes={nodes}
        edges={edges}
        onNodeClick={(node) => setPopup({ active: true, id: node.id })}
        maxDistance={10000}
        edgeArrowPosition="none"
      />
    </div>
  );
}

export default GraphView;
