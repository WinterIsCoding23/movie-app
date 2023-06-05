"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

import styles from "./Button.module.css";

export default function ToggleButton({ id, movie }) {
  // GET from mongoDB
  async function getInitialState() {
    const response = await fetch(`/api/watchlist/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    console.log("response in ToggleButton:", response);

    if (response.status === 404) {
      return null;
    }

    const jsonData = await response.json();
    console.log("jsonData in ToggleButton:", jsonData);
    return jsonData;
  }

  async function initializeState() {
    const initialStateData = await getInitialState();

    // Check if jsonData is not equal to 0 or null
    const initialState =
      initialStateData !== 0 && initialStateData !== null
        ? initialStateData.isFavorite
        : null;

    return initialState;
  }

  const [watchlistFavorite, setWatchlistFavorite] = useState(null);

  useEffect(() => {
    initializeState().then((initialState) => {
      setWatchlistFavorite(initialState);
    });
  }, []);
  console.log("watchlistFavorite in ToggleFunction: ", watchlistFavorite);

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
        {watchlistFavorite ? "Watched already" : "Want to watch"}
      </p>
    </button>
  );
}
