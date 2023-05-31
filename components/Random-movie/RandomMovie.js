import Image from "next/image";
import Link from "next/link";

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

  const imagePath = "https://image.tmdb.org/t/p/original";

  // get random movie-object from TMDB
  const randomMovieData = await getRandomMovie();
  const randomMovieId = randomMovieData.id;
  console.log("randomMovieId: ", randomMovieId);
  const randomMovieTitle = randomMovieData.title;
  const randomMoviePosterSource =
    `${imagePath}` + `${randomMovieData.poster_path}`;

  //fetch from mongoDB:
  let isFavorite = false;
  if (randomMovieId) {
    const response = await fetch(
      `http://localhost:3000/api/watchlist/${randomMovieId}`,
      {
        method: "GET",
      }
    );
    if (response.ok) {
      const jsonData = await response.json();
      console.log("jsonData: ", jsonData);
      isFavorite = jsonData.isFavorite;
    } else {
      console.log("not found");
    }
  }

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
            src={"/../public/no-image.png"}
            width={250}
            height={250}
            alt={randomMovieTitle}
          />
        )}
      </Link>
      {/* <ToggleButton id={randomMovieId} isFavorite={isFavorite} /> */}
    </div>
  );
}
