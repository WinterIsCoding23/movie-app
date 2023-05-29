// "use client";

import Image from "next/image";
import Link from "next/link";
// import useSWR from "swr";

import styles from "./RandomMovie.module.css";
import ToggleButton from "../WatchlistButton/ToggleFunction";
import { getMovies, getRandomMovie } from "../../services/fetchService";

export default async function RandomMovie() {
  // BEFORE fetchService.js:
  // Fetching data with SWR:
  // const fetcher = (...args) => fetch(...args).then((res) => res.json());
  // const URL = url;
  // const { data, error, isLoading } = useSWR(URL, fetcher);

  // if (error) {
  //   return <p>Error: {error.message}</p>;
  // }
  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }
  // if (!data) {
  //   return <h1>Loading...</h1>;
  // }

  // Rename data to be able to use it in the components as response (like before using SWR)
  // const response = data;

  // function getRandomMovie(response) {
  //   const randomNumber = Math.floor(Math.random() * response.results.length);
  //   console.log("response: ", response);
  //   return response.results[randomNumber];
  // }

  // const randomMovie = getRandomMovie(response);
  const imagePath = "https://image.tmdb.org/t/p/original";

  // ? fetch favorites from API
  // ? SWR
  async function fetchFavoriteMovie() {
    const favoriteMovie = await fetch("/api/watchlist").json();
    return favoriteMovie;
  }

  const randomMovieData = await getRandomMovie(); //object
  const randomMovieId = randomMovieData.id;
  const randomMovieTitle = randomMovieData.title;
  const randomMoviePosterSource =
    `${imagePath}` + `${randomMovieData.poster_path}`;

  return (
    <div className={styles.randomMovieContainer}>
      <h2 className={styles.randomHeader}>Random movie suggestion:</h2>
      <h3 className={styles.movieTitle}>{randomMovieTitle}</h3>
      <Link href={`/movie/${randomMovieId}`}>
        {randomMovieData.poster_path !== null ? (
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
            src={"/../../public/image-placeholder.png"}
            width={250}
            height={250}
            alt={randomMovieTitle}
          />
        )}
      </Link>
      <ToggleButton id={randomMovieId} />
    </div>
  );
}
