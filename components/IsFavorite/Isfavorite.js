"use client";

import Image from "next/image";

import useSWR from "swr";
import { useState } from "react";

import styles from "./Movie.module.css";
import GetDirector from "../MovieDetails/GetDirector";
import GetCast from "../MovieDetails/GetCast";
import GetStreaming from "../MovieDetails/GetStreaming";
import GetGenres from "../MovieDetails/GetGenres";

import ToggleButton from "../WatchlistButton/ToggleFunction";
import { getMovie } from "../../app/movie/[id]/page";

// --> fetch "movie" with SWR
// https://github.com/spiced-academy/savory-web-dev/blob/main/sessions/react-data-fetching/react-data-fetching.md

export default function MovieDetailsFavorites({ id }) {
  // original-fetcher:
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  // fetcher from https://www.alanwsmith.com/posts/make-multiple-swr-data-fetch-calls-in-the-same-react-component--20eorx9pdiji
  // const fetcher = (url) => fetch(url).then((res) => res.json());

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
  // console.log("isFavorite in IsFavorite.js: ", movie.)

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
  // const streamingSources = streaming?.streamingSources ?? [];
  // const unavailable = streaming?.unavailable;
  console.log("streaming: ", streaming);
  // console.log("streamingSources: ", streamingSources);

  // const streamingSources = streaming[0];
  // const unavailable = streaming[1];
  // console.log("streaming[0]: ", streaming[0]);
  // console.log("streaming[1]: ", streaming[1]);

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

  // set isFavorite-state
  // const [isFavorite, setFavorite] = useState({});

  // async function fetchMovieDetails() {
  //   const { data } = useSWR(`api/fetchmovie/${id}`, fetcher);
  // }

  // set isFavorite in mongoDB to the opposite value
  // function IsFavoriteToggle(id) {
  //   setFavorite((isFavorite) => {
  //     fetch(`/api/watchlist/${id}`, {
  //       method: "PUT",
  //       body: JSON.stringify({ isFavorite: !movie.isFavorite }),
  //     });
  //     return !isFavorite;
  //   });
  // }
  // const imagePath = "https://image.tmdb.org/t/p/original";

  // const movieDetails = await getMovieDetails({ id });
  // console.log("movie in IsFavorite: ", movie.id);
  // console.log("id in IsFavorite: ", id);

  // toggle-button to change value of isFavorite in mongoDB:
  // const toggleFavorite = () => {
  //   setFavorite((isFavorite) => {
  //     fetch(`/api/watchlist/${id}`, {
  //       method: "PUT",
  //       body: JSON.stringify({ isFavorite: !movie.isFavorite }),
  //     });
  //     return !isFavorite;
  //   });
  // };
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
        {/* <p className={styles.directorInfo}>
          <GetDirector id={movie.id} />
        </p> */}
      </div>

      {/* ////////////////////////// CAST //////////////////////////////////// */}
      <h3 className={styles.castTitle}>Cast:</h3>
      <p className={styles.castInfo}>{cast}</p>
      {/* <p className={styles.castInfo}>
        <GetCast id={movie.id} />
      </p> */}

      {/* ////////////////////////// GENRES //////////////////////////////////// */}
      <h3 className={styles.genresTitle}>Genres:</h3>
      <div className={styles.genresText}>{genres}</div>
      {/* <div className={styles.genresText}>
        <GetGenres id={movie.id} />
      </div> */}

      {/* ////////////////////////// SYNOPSIS //////////////////////////////////// */}
      <h3 className={styles.synopsisTitle}>Synopsis:</h3>
      <p className={styles.synopsisText}>{movie.overview}</p>

      {/* ////////////////////////// RELEASE-DATE //////////////////////////////////// */}
      <div className={styles.releaseContainer}>
        <h3 className={styles.releaseTitle}>Release-date:</h3>
        <p className={styles.releaseDate}>{movie.release_date}</p>
      </div>

      {/* ////////////////////////// ORIGINAL LANGUAGE //////////////////////////////////// */}
      <div className={styles.languageContainer}>
        <h3 className={styles.languageTitle}>Original language:</h3>
        <p className={styles.languageInfo}>
          {movie.original_language?.toUpperCase()}
        </p>
      </div>

      {/* ////////////////////////// STREAMING //////////////////////////////////// */}
      <div className={styles.streamingContainer}>
        <h3 className={styles.streamingTitle}>Streaming-options:</h3>
        <div className={styles.streamingInfo}>
          {streaming !== unavailable ? (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
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

          {/* {streamingSources !== [] ? (
            <ul
              className={styles.streamingList}
              style={{ listStyle: "none", padding: 0, margin: 0 }}
            >
              {streamingSources.map((streamingSource, index) => (
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
            <p>{unavailable}</p>
          )} */}
          {/* <GetStreaming id={movie.id} imagePath={imagePath} movie={movie} /> */}
        </div>
      </div>
    </div>
  );
}
