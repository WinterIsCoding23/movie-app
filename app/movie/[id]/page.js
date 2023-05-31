import Image from "next/image";

import styles from "./Movie.module.css";
import GetDirector from "../../../components/MovieDetails/GetDirector";
import GetCast from "../../../components/MovieDetails/GetCast";
import GetStreaming from "../../../components/MovieDetails/GetStreaming";
import GetGenres from "../../../components/MovieDetails/GetGenres";

import ToggleButton from "../../../components/WatchlistButton/ToggleFunction";
import IsFavorite from "./Isfavorite";

async function getMovie(id) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}`
  );
  return res.json();
}

export default async function MoviePage({ params: { id } }) {
  let movieData = await getMovie(id);
  const [movie] = await Promise.all([movieData]);
  const movieId = movie.id;

  // const imagePath = "https://image.tmdb.org/t/p/original";

  //fetch from mongoDB:
  let isFavorite = false;
  if (movieId) {
    const response = await fetch(
      `http://localhost:3000/api/watchlist/${movieId}`,
      {
        method: "GET",
      }
    );
    if (response.ok) {
      const jsonData = await response.json();
      console.log("jsonData: ", jsonData);
      isFavorite = jsonData.isFavorite;
      movieData = { ...movieData, isFavorite: isFavorite };
    } else {
      console.log("not found");
    }
  }

  //POST-request / set isFavorite to false

  return (
    <IsFavorite id={id} movie={[movie]} />
    // <div className={styles.movieContainer}>
    //   <h2 className={styles.title}>{movie.title}</h2>
    //   {movie.poster_path !== null ? (
    //     <Image
    //       className={styles.poster}
    //       src={imagePath + movie.poster_path}
    //       width={250}
    //       height={250}
    //       alt={movie.title}
    //     />
    //   ) : (
    //     <Image
    //       className={styles.poster}
    //       src={"/../public/no-image.png"}
    //       width={250}
    //       height={250}
    //       alt={movie.title}
    //     />
    //   )}

    //   <ToggleButton id={movie.id} isFavorite={isFavorite} />
    //   <IsFavorite movieData={movieData} />

    //   <h3 className={styles.directorTitle}>Director:</h3>
    //   <p className={styles.directorInfo}>
    //     <GetDirector id={movie.id} />
    //   </p>

    //   <h3 className={styles.castTitle}>Cast:</h3>
    //   <p className={styles.castInfo}>
    //     <GetCast id={movie.id} />
    //   </p>

    //   <h3 className={styles.genresTitle}>Genres:</h3>
    //   <div className={styles.genresText}>
    //     <GetGenres id={movie.id} />
    //   </div>

    //   <h3 className={styles.synopsisTitle}>Synopsis:</h3>
    //   <p className={styles.synopsisText}>{movie.overview}</p>
    //   <div className={styles.releaseContainer}>
    //     <h3 className={styles.releaseTitle}>Release-date:</h3>
    //     <p className={styles.releaseDate}>{movie.release_date}</p>
    //   </div>
    //   <div className={styles.languageContainer}>
    //     <h3 className={styles.languageTitle}>Original language:</h3>
    //     <p className={styles.languageInfo}>
    //       {movie.original_language.toUpperCase()}
    //     </p>
    //   </div>
    //   <div className={styles.streamingContainer}>
    //     <h3 className={styles.streamingTitle}>Streaming-options:</h3>
    //     <div className={styles.streamingInfo}>
    //       <GetStreaming id={movie.id} imagePath={imagePath} movie={movie} />
    //     </div>
    //   </div>
    // </div>
  );
}
