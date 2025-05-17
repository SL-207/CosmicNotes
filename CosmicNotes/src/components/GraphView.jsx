import { useState, useEffect } from "react";
import { GraphCanvas, lightTheme } from "reagraph";
import { Slider } from "@mui/material";
import { computeAllEdges } from "../services/noteService";
import styles from "./graphview.module.css";

const canvasTheme = {
  ...lightTheme,
  canvas: {
    ...lightTheme.canvas,
    background: "#1A2234",
  },
  node: {
    ...lightTheme.node,
    activeFill: "#6A4FD1",
    label: {
      ...lightTheme.node.label,
      activeColor: "#6A4FD1",
    },
  },
  edge: {
    ...lightTheme.edge,
    activeFill: "#6A4FD1",
  },
};
const sliderStyle = {
  display: "flex",
  justifyContent: "flex-end",
  color: "#6A4FD1",
  margin: "10px 20px",
  zIndex: 1,
  width: "20%",
};

function GraphView({ noteList, noteEdges, setEdges, setPopup }) {
  const [thold, setThold] = useState(40);
  const nodes = noteList.map((note) => ({
    id: note.id.toString(),
    label: note.title,
  }));
  const edges = noteEdges.map((edge) => ({
    source: edge.split("-")[0],
    target: edge.split("-")[1],
    id: edge,
  }));
  useEffect(() => {
    // recalculate edges on thold change
    computeAllEdges(noteList, thold).then((edges) => {
      setEdges(edges);
    });
  }, [thold]);
  return (
    <div className={styles.canvas}>
      <div className={styles.sliderLabel}>Similarity</div>
      <Slider
        aria-label="Small steps"
        defaultValue={40}
        step={10}
        marks
        min={20}
        max={80}
        valueLabelDisplay="auto"
        onChange={(e, val) => setThold(val)}
        sx={sliderStyle}
      />
      <GraphCanvas
        theme={canvasTheme}
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
