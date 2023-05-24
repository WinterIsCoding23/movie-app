import Link from "next/link";
import useSWR from "swr";

import styles from "./SearchForm.module.css";

export default function SearchForm() {
  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   const data = {
  //     title: event.target.title.value,
  //     director: event.target.director.value,
  //     cast: event.target.cast.value,
  //   };

  //   const JSONdata = JSON.stringify(data);

  //   const endpoint = "/api/search";

  //   const options = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSONdata,
  //   };

  //   const response = await fetch(endpoint, options);

  //   const result = await response.json();
  //   console.log("Is this your movie-search?", result.data);
  //   console.log("JSONdata", JSONdata);
  // };

  // const searchedMovies = useSWR("/search-results");

  // async function handleSubmit(event) {
  //   // event.preventDefault();

  //   const formData = new FormData(event.target);
  //   const movieSearchData = Object.fromEntries(formData);

  //   const request = new XMLHttpRequest();
  //   request.open("POST", "/search-results");
  //   movieSearchData.append(); // error: Uncaught (in promise) TypeError: movieSearchData.append is not a function
  //   request.send(movieSearchData);

  //   const response = await fetch("/search-results", {
  //     method: "GET",
  //     // headers: {
  //     //   "Content-Type": "application/json",
  //     // },
  //     // body: JSON.stringify(movieData), --> only for POST-request
  //   });

  //   if (response.ok) {
  //     await response.json();
  //     searchedMovies.mutate();
  //     event.target.reset();
  //   } else {
  //     console.log(response.status);
  //   }
  // }

  return (
    <div className={styles.searchContainer}>
      <form
        className={styles.form}
        // onSubmit={handleSubmit}
        action="/search-results"
      >
        <label htmlFor={"title"}>by title</label>
        <input
          type={"text"}
          id={"title"}
          name={"title"}
          //minLength / maxLength?
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
        <button type={"submit"} className={styles.submitButton}>
          <h6>Submit search</h6>
        </button>
      </form>
    </div>
  );
}
