import Image from "next/image";

import Movie from "./Movie";

export default async function Home({ title, imagePath, poster_path }) {
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`
  );

  const response = await data.json();

  return (
    <main>
      <h1>Movie-App</h1>
      {response.results.map((movie) => (
        <Movie title={title} imagePath={imagePath} poster_path={poster_path} />
      ))}
    </main>
  );
}
