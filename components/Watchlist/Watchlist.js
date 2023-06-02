"use client";

import useSWR from "swr";

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
  console.log("moviesOnWatchlist in Watchlist.js: ", moviesOnWatchlist); // array of objects

  return (
    <div>
      <h2 className={styles.watchlistHeader}>My Watchlist</h2>
      <ul className={styles.watchlistContainer}>
        {moviesOnWatchlist.map(
          (movieOnWatchlist, index) => (
            <li key={index}>{movieOnWatchlist.id}</li>
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
