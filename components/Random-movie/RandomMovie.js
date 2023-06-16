import Image from "next/image";
import Link from "next/link";

import styles from "./RandomMovie.module.css";
import { getRandomMovie } from "../../services/fetchService";

export default async function RandomMovie() {
  const imagePath = "https://image.tmdb.org/t/p/original";

  // get random movie-object from TMDB
  const randomMovieData = await getRandomMovie();
  const randomMovieId = randomMovieData.id;
  const randomMovieTitle = randomMovieData.title;
  const randomMoviePosterSource =
    `${imagePath}` + `${randomMovieData.poster_path}`;

  return (
    <div>
      <h2 className={styles.randomHeader}>Random movie of today:</h2>
      <div className={styles.randomMovieContainer}>
        <h3 className={styles.movieTitle}>{randomMovieTitle}</h3>
        <Link href={`/movie/${randomMovieId}`}>
          {randomMovieData.poster_path !== null || undefined ? (
            <Image
              className={styles.moviePoster}
              src={randomMoviePosterSource}
              width={250}
              height={250}
              alt={randomMovieTitle}
              priority={true}
            />
          ) : (
            <Image
              className={styles.moviePoster}
              src={"/../public/no-image.png"}
              width={250}
              height={250}
              alt={randomMovieTitle}
            />
          )}
        </Link>
             </div>
    </div>
  );
}
