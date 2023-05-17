import Image from "next/image";
import Link from "next/link";

import styles from "./RandomMovie.module.css";

export default function RandomMovie({ response }) {
  function getRandomMovie(response) {
    const randomNumber = Math.floor(Math.random() * response.results.length);
    //console.log("response: ", response);
    //console.log("response.length: ", response.results.length);
    return response.results[randomNumber];
  }

  const randomMovie = getRandomMovie(response);
  //console.log("randomMovie: ", randomMovie);

  const imagePath = "https://image.tmdb.org/t/p/original";

  return (
    <div className={styles.randomMovieContainer}>
      <h2 className={styles.randomHeader}>Random movie suggestion:</h2>
      <h3 className={styles.movieTitle}>{randomMovie.title}</h3>
      {/* Here we want to link to the detail-page of the random movie: */}
      <Link href="/movie-details">
        <Image
          className={styles.moviePoster}
          src={imagePath + randomMovie.poster_path}
          width={250}
          height={250}
          alt={randomMovie.title}
          priority={true}
        />
      </Link>
    </div>
  );
}
