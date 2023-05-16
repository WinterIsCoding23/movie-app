import Image from "next/image";

import styles from "./RandomMovie.module.css";

export default function RandomMovie({ response }) {
  function getRandomMovie(response) {
    const randomNumber = Math.floor(Math.random() * response.results.length);
    console.log("response: ", response);
    console.log("response.length: ", response.results.length);
    return response.results[randomNumber];
  }

  const randomMovie = getRandomMovie(response);
  console.log("randomMovie: ", randomMovie);

  const imagePath = "https://image.tmdb.org/t/p/original";

  return (
    <div>
      <h2 className={styles.movieTitle}>{randomMovie.title}</h2>
      <Image
        className={styles.moviePoster}
        src={imagePath + randomMovie.poster_path}
        width={400}
        height={400}
        alt={randomMovie.title}
      />
    </div>
  );
}
