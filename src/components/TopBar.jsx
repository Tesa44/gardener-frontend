import styles from "./TopBar.module.css";
import { Link } from "react-router-dom";

function TopBar({ onSortChange, sortOption, onSearchChange, searchQuery }) {
  return (
    <div className={styles.topBar}>
      <input
        className={styles.search}
        type="text"
        placeholder="🔍 Search plants..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <div className={styles.topControls}>
        <select
          className={styles.sortSelect}
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="name-asc">Name A–Z</option>
          <option value="name-desc">Name Z–A</option>
          <option value="date-oldest">Oldest First</option>
          <option value="date-newest">Newest First</option>
        </select>
        <Link to="/add-plant" className={styles.addButton}>
          + Add Plant
        </Link>
      </div>
    </div>
  );
}

export default TopBar;
