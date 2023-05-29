"use client";

import WatchlistButton from "./WatchlistButton";
import NoWatchlistButton from "./NoWatchlistButton";
import { useState } from "react";

export default async function ToggleButton({ id }) {
  console.log("id in ToggleFunction.js:", id);

  //GET NextResponse-object from mongoDB
  const responseData = await fetch(`/api/watchlist/${id}`);
  const response = await responseData.json();
  const checkFavorite = response?.isFavorite ? response.isFavorite : false;
  console.log("checkFavorite:", checkFavorite);

  const [isFavorite, setFavorite] = useState(checkFavorite);

  const toggleFavorite = () => {
    setFavorite((isFavorite) => {
      if (isFavorite === true) {
        console.log("Remove movie from Watchlist");
      } else if (isFavorite === false) {
        console.log("Add movie to Watchlist");
      }
      fetch(`/api/watchlist/${id}`, {
        method: "PUT",
        body: JSON.stringify({ isFavorite: !isFavorite }),
      });
      return !isFavorite;
    });
  };

  return isFavorite === false ? (
    <NoWatchlistButton onClick={() => toggleFavorite()} key={id} />
  ) : (
    <WatchlistButton onClick={() => toggleFavorite()} key={id} />
  );
  // <button type="button" onClick={() => toggleFavorite()} key={"Movie-Id"}>
  //   {favorite === true ? noWatchlistMovie : watchlistMovie}
  // </button>
}
