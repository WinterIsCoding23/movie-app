import Link from "next/link";

import styles from "./SearchForm.module.css";

export default function SearchForm() {
  return (
    <div className={styles.searchContainer}>
      <form className={styles.form}>
        <label htmlFor={"title"}>by title</label>
        <input
          type={"text"}
          id={"title"}
          name={"title"}
          placeholder={"Please write here"}
          autoFocus
        />
        <label htmlFor={"director"}>by director</label>
        <input
          type={"text"}
          id={"director"}
          name={"director"}
          placeholder={"Please write here"}
        />
        <label htmlFor={"cast"}>by cast</label>
        <input
          type={"text"}
          id={"cast"}
          name={"cast"}
          placeholder={"Please write here"}
        />
      </form>
      <Link href={`/search-results`}>
        <button className={styles.submitButton}>
          <h6>Submit search</h6>
        </button>
      </Link>
    </div>
  );
}
