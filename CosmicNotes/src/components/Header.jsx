import { Button } from "@mui/material";

import PlusIcon from "@mui/icons-material/Add";
import Menu from "@mui/icons-material/Menu";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import styles from "./header.module.css";

const viewButton = (isActive) => ({
  backgroundColor: "transparent",
  color: isActive ? "#6A4FD1" : "#e2e8f0", // or #7531D1
  fontSize: "0.75em",
});
const addButton = {
  backgroundColor: "#6A4FD1",
  color: "#e2e8f0",
  margin: "5px 0 5px 5px",
  fontSize: "0.75em",
};

export default function Header({ setPopup, view, setView }) {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>Cosmic Notes</h1>
      <div className={styles.buttonContainer}>
        <Button // List View
          variant="contained"
          startIcon={<Menu />}
          sx={viewButton(view === "list")}
          onClick={() => setView("list")}
        >
          List
        </Button>
        <Button // Graph View
          variant="contained"
          startIcon={<BubbleChartIcon />}
          sx={viewButton(view === "graph")}
          onClick={() => setView("graph")}
        >
          Graph
        </Button>
        <Button // Add New Note
          variant="contained"
          startIcon={<PlusIcon />}
          sx={addButton}
          onClick={() => setPopup({ active: true, id: "NA" })}
        >
          New Note
        </Button>
      </div>
    </div>
  );
}
