import Image from "next/image";

import styles from "./page.module.css";

import RandomMovie from "../components/random-movie/RandomMovie";
import SearchButton from "../components/search-button/SearchButton";
import Watchlist from "../components/watchlist/Watchlist";
import NavBar from "../components/navbar/NavBar";

async function getData() {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Home({ id, title }) {
  const response = await getData();
  // To fetch fresh data on every fetch request:
  // { cache: "no-store" }

  // const response = await data.json();

  // Streaming-providers:
  // const options = {
  //   method: "GET",
  //   headers: {
  //     accept: "application/json",
  //     Authorization: "Bearer d093465b55cd2b394c2b5f7dd5c6e8e7",
  //   },
  // };

  // fetch("https://api.themoviedb.org/3/movie/movie_id/watch/providers", options)
  //   .then((response) => response.json())
  //   .then((response) => console.log(response))
  //   .catch((err) => console.error(err));

  return (
    <>
      <main>
        <h1 className={styles.title}>Movie-App</h1>
        <RandomMovie response={response} />
        {/* {response.results.map((movie) => (
          <Movie
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster_path={movie.poster_path}
          />
        ))} */}
        <SearchButton />
        <Watchlist response={response} id={id} title={title} />
      </main>
      <footer>
        <p>Copyright 2023</p>
      </footer>
    </>
  );
}
