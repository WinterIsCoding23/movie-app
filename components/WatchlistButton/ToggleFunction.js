"use client";

import Image from "next/image";
import { useState } from "react";

import styles from "./Button.module.css";

export default function ToggleButton({ id, movie }) {
  // GET from mongoDB
  async function getInitialState() {
    const response = await fetch(`/api/watchlist/${id}`, {
      method: "GET",
      // body: JSON.stringify({ isFavorite }),
      headers: { "Content-Type": "application/json" },
    });
    const jsonData = await response.json();
    return jsonData;
  }
  const initialStateData = getInitialState();
  const initialState = initialStateData.isFavorite;

  const [watchlistFavorite, setWatchlistFavorite] = useState(
    initialState ? initialState : null
  );

  // const [number, setNumber] = useState((data) => data === 'end' ? 5 : 0)
  console.log("movie in ToggleFunction.js: ", movie);

  const toggleFavorite = () => {
    const imagePath = "https://image.tmdb.org/t/p/original";
    const newIsFavorite = !watchlistFavorite;

    fetch(`/api/watchlist/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        id: movie.id,
        title: movie.title,
        image: imagePath + movie.poster_path,
        isFavorite: newIsFavorite,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then((watchlistEntry) => {
        setWatchlistFavorite(watchlistEntry.isFavorite);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };

  return (
    <button
      className={styles.toggleButton}
      type="button"
      onClick={toggleFavorite}
    >
      <Image
        src={
          watchlistFavorite
            ? "/../public/director-chair-filled.png"
            : "/../public/director-chair-empty.png"
        }
        width={30}
        height={30}
        alt={watchlistFavorite ? "already-a-favorite" : "no-favorite-yet"}
      />
      <p className={styles.buttonDescription}>
        {watchlistFavorite ? "un-favor movie" : "make favorite"}
      </p>
    </button>
  );
}
