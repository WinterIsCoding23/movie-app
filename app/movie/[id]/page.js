import Image from "next/image";

import NavBar from "../../navbar/NavBar";
import styles from "./Movie.module.css";

async function getMovie(id) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}`
  );
  return res.json();
}

export default async function MoviePage({ params: { id } }) {
  console.log("id ", id);

  const movieData = getMovie(id);
  console.log("movieData ", movieData);

  const [movie] = await Promise.all([movieData]);

  const imagePath = "https://image.tmdb.org/t/p/original";
  console.log("genres", [movie.genre_ids]);

  return (
    <div className={styles.movieContainer}>
      <h2 className={styles.movieTitle}>{movie.title}</h2>
      <p>Release-date: {movie.release_date}</p>
      {/* <p>Genres: {movie.genre_ids.map((genre) => genre)}</p> */}
      <Image
        src={imagePath + movie.poster_path}
        width={250}
        height={250}
        alt={movie.title}
      />
      <p>Synopsis: {movie.overview}</p>
      <NavBar />
    </div>
  );
}
