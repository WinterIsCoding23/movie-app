import Image from "next/image";

import styles from "./page.module.css";

import RandomMovie from "./random-movie/RandomMovie";
import SearchButton from "./search-button/SearchButton";
import Watchlist from "./watchlist/Watchlist";
import NavBar from "./navbar/NavBar";

export default async function Home({ id, title }) {
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`
  );

  const response = await data.json();

  return (
    <body className={styles.body}>
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
      <NavBar />
    </body>
  );
}
