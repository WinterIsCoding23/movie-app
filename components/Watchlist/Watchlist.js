import styles from "./Watchlist.module.css";

export default function Watchlist() {
  return (
    <div>
      <h2 className={styles.watchlistHeader}>My Watchlist</h2>
      <ul className={styles.watchlistContainer}>
        </ul>
    </div>
  );
}
