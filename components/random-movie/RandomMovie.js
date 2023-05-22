"use client";

import Image from "next/image";
import Link from "next/link";

import useSWR from "swr";

import styles from "./RandomMovie.module.css";

export default function RandomMovie({ url }) {
  // Fetching data with SWR:
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const URL = url;
  const { data } = useSWR(URL, fetcher);

  if (!data) {
    return <h1>Loading...</h1>;
  }

  const response = data;

  function getRandomMovie(response) {
    const randomNumber = Math.floor(Math.random() * response.results.length);
    console.log("response: ", response);

    return response.results[randomNumber];
  }

  const randomMovie = getRandomMovie(response);

  const imagePath = "https://image.tmdb.org/t/p/original";

  return (
    <div className={styles.randomMovieContainer}>
      <h2 className={styles.randomHeader}>Random movie suggestion:</h2>
      <h3 className={styles.movieTitle}>{randomMovie.title}</h3>
      <Link href={`/movie/${randomMovie.id}`}>
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
