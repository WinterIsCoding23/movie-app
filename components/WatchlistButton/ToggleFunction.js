"use client";

import Image from "next/image";
import { useState } from "react";

export default function ToggleButton({ id, isFavorite }) {
  const [watchlistFavorite, setWatchlistFavorite] = useState(isFavorite);

  const toggleFavorite = () => {
    const newIsFavorite = !watchlistFavorite;

    fetch(`/api/watchlist/${id}`, {
      method: "PUT",
      body: JSON.stringify({ isFavorite: newIsFavorite }),
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
    <button type="button" onClick={toggleFavorite}>
      <Image
        src={
          watchlistFavorite
            ? "/../public/director-chair-filled.png"
            : "/../public/director-chair-empty.png"
        }
        width={30}
        height={30}
        alt={watchlistFavorite ? "no-favorite-yet" : "already-a-favorite"}
      />
      <p>{watchlistFavorite ? "un-favor movie" : "make favorite"}</p>
    </button>
  );
}
