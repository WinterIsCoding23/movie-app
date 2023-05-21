export default function SearchForm() {
  return (
    <form>
      <label htmlFor={"title"}>Movie title</label>
      <input type={"text"} id={"title"} name={"title"} />
      <label htmlFor={"director"}>Director</label>
      <input type={"text"} id={"director"} name={"director"} />
      <label htmlFor={"cast"}>Cast</label>
      <input type={"text"} id={"cast"} name={"cast"} />
    </form>
  );
}
