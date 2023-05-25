"use client";

import Image from "next/image";
import { useState } from "react";

export default function WatchlistButton() {
  const watchlistMovie = (
    <Image
      src={"../../public/director-chair-filled.png"}
      width={10}
      height={10}
      alt={"favourite"}
    />
  );
  const noWatchlistMovie = (
    <Image
      src={"../../public/director-chair-empty.png"}
      width={10}
      height={10}
      alt={"no-favourite"}
    />
  );

  const [favorite, setFavorite] = useState(false);

  const toggleFavorite = () => {
    setFavorite((favorite) => {
      if (favorite === true) {
        console.log("Remove movie from Watchlist");
        fetch("MONGODB", { method: "POST" });
      } else if (favorite === false) {
        console.log("Add movie to Watchlist");
        fetch("MONGODB", { method: "POST" });
      }
      return !favorite;
    });
  };

  return (
    <button type="button" onClick={() => toggleFavorite()} key={"Movie-Id"}>
      {favorite === true ? watchlistMovie : noWatchlistMovie}
    </button>
  );
}
