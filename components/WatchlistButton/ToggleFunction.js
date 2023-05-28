"use client";

import WatchlistButton from "./WatchlistButton";
import NoWatchlistButton from "./NoWatchlistButton";
import { useState } from "react";

export default function ToggleButton() {
  const [favorite, setFavorite] = useState(false);

  const toggleFavorite = () => {
    setFavorite((favorite) => {
      if (favorite === true) {
        console.log("Remove movie from Watchlist");
      } else if (favorite === false) {
        console.log("Add movie to Watchlist");
      }
      fetch("/api/watchlist", { method: "POST", body: JSON.stringify() });
      return !favorite;
    });
  };

  return favorite === true ? (
    <NoWatchlistButton onClick={() => toggleFavorite()} key={"Movie-Id"} />
  ) : (
    <WatchlistButton onClick={() => toggleFavorite()} key={"Movie-Id"} />
  );
  // <button type="button" onClick={() => toggleFavorite()} key={"Movie-Id"}>
  //   {favorite === true ? watchlistMovie : noWatchlistMovie}
  //   {favorite === true ? noWatchlistMovie : watchlistMovie}
  // </button>
}
