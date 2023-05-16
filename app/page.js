import Image from "next/image";

import Movie from "./Movie";
import RandomMovie from "./RandomMovie";
import SearchButton from "./SearchButton";
import Watchlist from "./Watchlist";
import NavBar from "./NavBar";

export default async function Home({ id, title }) {
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`
  );

  const response = await data.json();

  return (
    <body>
      <main>
        <h1>Movie-App</h1>
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
