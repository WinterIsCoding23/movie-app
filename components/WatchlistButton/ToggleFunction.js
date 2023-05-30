"use client";

import Image from "next/image";
import { useState } from "react";

export default async function ToggleButton({ id, isFavorite }) {
  console.log("id in ToggleFunction.js:", id);
  console.log("isFavorite:", isFavorite);

  const [watchlistFavorite, setWatchlistFavorite] = useState(isFavorite);

  const toggleFavorite = () => {
    setWatchlistFavorite((watchlistFavorite) => {
      if (watchlistFavorite === true) {
        console.log("Remove movie from Watchlist");
      } else if (watchlistFavorite === false) {
        console.log("Add movie to Watchlist");
      }
      fetch(`/api/watchlist/${id}`, {
        method: "PUT",
        body: JSON.stringify({ watchlistFavorite: !watchlistFavorite }),
      });
      return !watchlistFavorite;
    });
  };

  function WatchlistButton() {
    return (
      <button type="button" onClick={() => toggleFavorite()}>
        <Image
          src={"/../public/director-chair-empty.png"}
          width={30}
          height={30}
          alt={"already-a-favorite"}
        />
        <p>"un-favor movie"</p>
      </button>
    );
  }

  function NoWatchlistButton() {
    return (
      <button type="button" onClick={() => toggleFavorite()}>
        <Image
          src={"/../public/director-chair-filled.png"}
          width={30}
          height={30}
          alt={"no-favorite-yet"}
        />
        <p>"make favorite"</p>
      </button>
    );
  }

  return watchlistFavorite === false ? (
    <NoWatchlistButton />
  ) : (
    <WatchlistButton />
  );
}
