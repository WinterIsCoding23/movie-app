"use client";

import Image from "next/image";
import useSWR from "swr";

import styles from "./IsFavorite.module.css";
import ToggleButton from "../WatchlistButton/ToggleFunction";

export default function MovieDetailsFavorites({ id }) {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  // get movie
  const { data: movieData, isLoading: isLoadingMovie } = useSWR(
    `/api/fetchmovie/${id}`,
    fetcher,
    {
      shouldRetryOnError: true,
    }
  );
  const movie =
    movieData && movieData.length === 0
      ? "Unfortunately, no movie-data could be found for this id."
      : movieData;
  console.log("movie", movie);

  // getdirector
  const { data: directorsData, isLoading: isLoadingDirector } = useSWR(
    `/api/getdirectors/${id}`,
    fetcher,
    {
      shouldRetryOnError: true,
    }
  );
  const isLoadingDirectors = !directorsData;
  const directors =
    directorsData && directorsData.length === 0
      ? "Unfortunately, no trace of any director."
      : directorsData;

  console.log("directors", directors);

  // get cast
  const { data: cast, isLoading: isLoadingCast } = useSWR(
    `/api/getcast/${id}`,
    fetcher
  );
  console.log("cast", cast);

  // get genres
  const { data: genresData, isLoading: isLoadingGenres } = useSWR(
    `/api/getgenres/${id}`,
    fetcher
  );
  const genres =
    genresData && genresData.length === 0
      ? "Unfortunately, no trace of any genres."
      : genresData;
  console.log("genres", genres);

  // get streaming
  const { data: streaming, isLoading: isLoadingStreaming } = useSWR(
    `/api/getstreaming/${id}`,
    fetcher
  );

  const unavailable =
    "Unfortunately, this movie is currently not being streamed in Germany.";

  console.log("streaming: ", streaming);

  const imagePath = "https://image.tmdb.org/t/p/original";

  if (
    isLoadingMovie ||
    isLoadingDirectors ||
    isLoadingCast ||
    isLoadingGenres ||
    isLoadingStreaming
  ) {
    return <div>Loading...</div>;
  }

  console.log("movie in IsFavorite.js: ", movie);

  return (
    <div className={styles.movieContainer}>
      {/* ////////////////////////// TITLE //////////////////////////////////// */}
      <h2 className={styles.title}>{movie.title}</h2>

      {/* ////////////////////////// POSTER //////////////////////////////////// */}
      {movie.poster_path ? (
        <Image
          className={styles.poster}
          src={imagePath + movie.poster_path}
          width={250}
          height={250}
          alt={movie.title}
        />
      ) : (
        <Image
          className={styles.poster}
          src={"/no-image.png"}
          width={250}
          height={250}
          alt={movie.title}
        />
      )}

      {/* ////////////////////////// TOGGLE-BUTTON //////////////////////////////////// */}
      <div className={styles.toggleButtonContainer}>
        <ToggleButton
          className={styles.toggleButton}
          id={movie.id}
          movie={movie}
        />
      </div>

      {/* //////////////////////////DIRECTOR//////////////////////////////////// */}
      <div>
        <h3 className={styles.directorTitle}>Director:</h3>
        <p className={styles.directorInfo}>{directors}</p>
      </div>

      {/* ////////////////////////// CAST //////////////////////////////////// */}
      <h3 className={styles.castTitle}>Cast:</h3>
      <p className={styles.castInfo}>{cast}</p>

      {/* ////////////////////////// GENRES //////////////////////////////////// */}
      <h3 className={styles.genresTitle}>Genres:</h3>
      <div className={styles.genresText}>{genres}</div>

      {/* ////////////////////////// SYNOPSIS //////////////////////////////////// */}
      <h3 className={styles.synopsisTitle}>Synopsis:</h3>
      <p className={styles.synopsisText}>
        {movie.overview !== ""
          ? movie.overview
          : "Unfortunately, no trace of any synopsis."}
      </p>

      {/* ////////////////////////// RELEASE-DATE //////////////////////////////////// */}
      <div className={styles.releaseContainer}>
        <h3 className={styles.releaseTitle}>Release-date:</h3>
        <p className={styles.releaseDate}>
          {movie.release_date !== ""
            ? movie.release_date
            : "Unfortunately, no trace of any release-date."}
        </p>
      </div>

      {/* ////////////////////////// ORIGINAL LANGUAGE //////////////////////////////////// */}
      <div className={styles.languageContainer}>
        <h3 className={styles.languageTitle}>Original language:</h3>
        <p className={styles.languageInfo}>
          {movie.original_language !== null
            ? movie.original_language?.toUpperCase()
            : "Unfortunately, no trace of any original language."}
        </p>
      </div>

      {/* ////////////////////////// STREAMING //////////////////////////////////// */}
      <div className={styles.streamingContainer}>
        <h3 className={styles.streamingTitle}>Streaming-options:</h3>
        <div className={styles.streamingInfo}>
          {streaming !== unavailable ? (
            <ul
              className={styles.streamingProviders}
              style={{ listStyle: "none", padding: 0, margin: 0 }}
            >
              {streaming.map((streamingSource, index) => (
                <li key={index}>
                  <Image
                    src={streamingSource}
                    width={80}
                    height={80}
                    alt={streamingSource}
                    style={{ borderRadius: 20, padding: 10 }}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ borderRadius: 20, padding: 10, margin: 0 }}>
              {streaming}
            </p>
          )}
                  </div>
      </div>
    </div>
  );
}

