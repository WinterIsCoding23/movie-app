import Image from "next/image";

import NavBar from "../../../components/navbar/NavBar";
import styles from "./Movie.module.css";

async function getMovie(id) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}`
  );
  return res.json();
}

export default async function MoviePage({ params: { id } }) {
  // console.log("id ", id);

  const movieData = getMovie(id);
  // console.log("movieData ", movieData);

  const [movie] = await Promise.all([movieData]);

  const imagePath = "https://image.tmdb.org/t/p/original";

  // Get director:
  async function getDirector(id) {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.API_KEY}`
    );

    const jsonData = await res.json();
    const directorData = jsonData.crew.filter(({ job }) => job === "Director");
    const director = directorData[0].original_name;

    return director;
  }
  //End of getDirector

  // Get cast:
  async function getCast(id) {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.API_KEY}`
    );

    const jsonData = await res.json(); //json-object
    const castData =
      jsonData.cast.length > 9 ? jsonData.cast.slice(0, 10) : jsonData.cast; //array
    const cast = castData.map((element) =>
      element === castData[castData.length - 1]
        ? element.name
        : element.name + ", "
    );

    return cast;
  }
  //End of getCast

  return (
    <div className={styles.movieContainer}>
      <h2 className={styles.title}>{movie.title}</h2>
      {/* <p>Genres: {movie.genre_ids.map((genre) => genre)}</p> */}
      <Image
        className={styles.poster}
        src={imagePath + movie.poster_path}
        width={250}
        height={250}
        alt={movie.title}
      />

      <h4 className={styles.directorTitle}>Director:</h4>
      <p className={styles.directorInfo}>{await getDirector(movie.id)}</p>

      <h4 className={styles.castTitle}>Cast:</h4>
      <p className={styles.castInfo}>{await getCast(movie.id)}</p>
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
        {/* <p className={styles.streamingInfo}>{movie.}</p> */}
      </div>
    </div>
  );
}
