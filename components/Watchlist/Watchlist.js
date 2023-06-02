"use client";

import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";

import styles from "./Watchlist.module.css";

// api-route: api/watchlist

export default function Watchlist() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const {
    data: moviesOnWatchlist,
    error,
    isLoading: isLoadingMoviesOnWatchlist,
  } = useSWR(`/api/watchlist`, fetcher);

  if (isLoadingMoviesOnWatchlist) {
    return <div>Loading Watchlist...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  // moviesOnWatchlist = array of objects
  console.log("moviesOnWatchlist in Watchlist.js: ", moviesOnWatchlist);

  const imagePath = "https://image.tmdb.org/t/p/original";

  return (
    <div>
      <h2 className={styles.watchlistHeader}>My Watchlist</h2>
      <ul className={styles.watchlistContainer}>
        {moviesOnWatchlist.map(
          (movieOnWatchlist, index) => (
            <li key={index}>
              <p>{movieOnWatchlist.id}</p>
              <h3> {movieOnWatchlist.title}</h3>
              <Link href={`/movie/${movieOnWatchlist.id}`}>
                {movieOnWatchlist.image}

                {/* {movieOnWatchlist.poster_path !== null || undefined ? (
                  <Image
                    // className={styles.moviePoster}
                    src={imagePath + movieOnWatchlist.poster_path}
                    width={250}
                    height={250}
                    alt={movieOnWatchlist}
                    priority={true}
                  />
                ) : (
                  <Image
                    // className={styles.moviePoster}
                    src={"/../public/no-image.png"}
                    width={250}
                    height={250}
                    alt={movieOnWatchlist.title}
                  />
                )} */}
              </Link>
            </li>
          )
          // {Object.values(moviesOnWatchlist).forEach(
          //   (movieOnWatchlist) => (
          //     <li key={movieOnWatchlist.id}>{movieOnWatchlist.isFavorite}</li>
          //   )
          //   console.log("movieOnWatchlist: ", movieOnWatchlist)
        )}
      </ul>
    </div>
  );
}
