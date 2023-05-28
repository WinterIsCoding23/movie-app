"use client";

import WatchlistButton from "./WatchlistButton";
import NoWatchlistButton from "./NoWatchlistButton";
import { useState } from "react";

export default function ToggleButton() {
  const [isFavorite, setFavorite] = useState(false);

  const toggleFavorite = () => {
    setFavorite((isFavorite) => {
      if (isFavorite === true) {
        console.log("Remove movie from Watchlist");
      } else if (isFavorite === false) {
        console.log("Add movie to Watchlist");
      }
      fetch("/api/watchlist", { method: "POST", body: JSON.stringify() });
      return !isFavorite;
    });
  };

  return isFavorite === false ? (
    <NoWatchlistButton onClick={() => toggleFavorite()} key={"Movie-Id"} />
  ) : (
    <WatchlistButton onClick={() => toggleFavorite()} key={"Movie-Id"} />
  );
  // <button type="button" onClick={() => toggleFavorite()} key={"Movie-Id"}>
  //   {favorite === true ? noWatchlistMovie : watchlistMovie}
  // </button>
}
