import Image from "next/image";

import Movie from "./Movie";
import Watchlist from "./Watchlist";
import Footer from "./Footer";

export default async function Home({ id, title }) {
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`
  );

  const response = await data.json();

  return (
    <body>
      <main>
        <h1>Movie-App</h1>
        {response.results.map((movie) => (
          <Movie
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster_path={movie.poster_path}
          />
        ))}
        <button type="button">Search</button>
        <Watchlist response={response} id={id} title={title} />
      </main>
      <footer>
        <p>Copyright 2023</p>
      </footer>
      <Footer />
    </body>
  );
}
