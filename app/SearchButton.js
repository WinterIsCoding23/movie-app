import styles from "./SearchButton.module.css";

export default function SearchButton() {
  return (
    <button className={styles.button} type="button">
      <div className={styles.buttonText}>Search</div>
    </button>
  );
}
