"use client";

import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

import styles from "./Watchlist.module.css";

export default function Watchlist({ url }) {
  const imagePath = "https://image.tmdb.org/t/p/original";

  // Fetching data with SWR:
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const URL = url;
  const { data } = useSWR(URL, fetcher);

  if (!data) {
    return <h1>Loading...</h1>;
  }

  const response = data;

  return (
    <div>
      <h2 className={styles.watchlistHeader}>My Watchlist</h2>
      <ul className={styles.watchlistContainer}>
        {response.results.map((movie) => (
          <li key={movie.id}>
            <h3>{movie.title}</h3>
            <Link href={`/movie/${movie.id}`}>
              <Image
                className={styles.imageContainer}
                src={imagePath + movie.poster_path}
                width={100}
                height={100}
                alt={movie.title}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
