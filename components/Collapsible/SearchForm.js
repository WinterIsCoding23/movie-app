import styles from "./SearchForm.module.css";

export default function SearchForm() {
  return (
    <form className={styles.form}>
      <label htmlFor={"title"}>by title</label>
      <input type={"text"} id={"title"} name={"title"} />
      <label htmlFor={"director"}>by director</label>
      <input type={"text"} id={"director"} name={"director"} />
      <label htmlFor={"cast"}>by cast</label>
      <input type={"text"} id={"cast"} name={"cast"} />
    </form>
  );
}
