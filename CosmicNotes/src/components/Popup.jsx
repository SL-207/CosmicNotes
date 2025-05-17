import styles from "./popup.module.css";

function Popup({ children }) {
  return (
    // Set modal or popup with fixed pos and inset 0
    <div className={styles.popupBackdrop}>
      <div className={styles.popup}>{children}</div>
    </div>
  );
}

export default Popup;