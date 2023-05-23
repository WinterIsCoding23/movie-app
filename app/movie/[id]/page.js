import Image from "next/image";

import styles from "./Movie.module.css";
import GetDirector from "../../../components/MovieDetails/GetDirector";
import GetCast from "../../../components/MovieDetails/GetCast";
import GetStreaming from "../../../components/MovieDetails/GetStreaming";
import GetGenres from "@/components/MovieDetails/GetGenres";

async function getMovie(id) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}`
  );
  return res.json();
}

export default async function MoviePage({ params: { id } }) {
  const movieData = getMovie(id);
  const [movie] = await Promise.all([movieData]);

  const imagePath = "https://image.tmdb.org/t/p/original";

  return (
    <div className={styles.movieContainer}>
      <h2 className={styles.title}>{movie.title}</h2>
      <Image
        className={styles.poster}
        src={imagePath + movie.poster_path}
        width={250}
        height={250}
        alt={movie.title}
      />

      <h4 className={styles.directorTitle}>Director:</h4>
      <p className={styles.directorInfo}>
        <GetDirector id={movie.id} />
      </p>

      <h4 className={styles.castTitle}>Cast:</h4>
      <p className={styles.castInfo}>
        <GetCast id={movie.id} />
      </p>

      <h4 className={styles.genresTitle}>Genres:</h4>
      <div className={styles.genresText}>
        <GetGenres id={movie.id} />
      </div>

      <h4 className={styles.synopsisTitle}>Synopsis:</h4>
      <p className={styles.synopsisText}>{movie.overview}</p>
      <div className={styles.releaseContainer}>
        <h4 className={styles.releaseTitle}>Release-date:</h4>
        <p className={styles.releaseDate}>{movie.release_date}</p>
      </div>
      <div className={styles.languageContainer}>
        <h4 className={styles.languageTitle}>Original language:</h4>
        <p className={styles.languageInfo}>
          {movie.original_language.toUpperCase()}
        </p>
      </div>
      <div className={styles.streamingContainer}>
        <h4 className={styles.streamingTitle}>Streaming-options:</h4>
        <div className={styles.streamingInfo}>
          <GetStreaming id={movie.id} imagePath={imagePath} movie={movie} />
        </div>
      </div>
    </div>
  );
}
