import Image from "next/image";
//import styles from "./page.module.css";

export default async function Home({ title }) {
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`
  );

  const response = await data.json();

  const imagePath = "https://image.tmdb.org/t/p/original";

  return (
    <main>
      <h1>Movie-App</h1>
      {response.results.map((movie) => (
        <div>
          <h2>{movie.title}</h2>
          <Image src={imagePath + movie.poster_path} width={400} height={400} />
        </div>
      ))}
    </main>
  );
}
