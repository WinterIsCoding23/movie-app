"use client";

import { useState } from "react";

export default async function IsFavoriteToggle({ movieData }) {
  fetch(`/api/watchlist/${id}`, {
    method: "PUT",
    body: JSON.stringify({ isFavorite: !movieData.isFavorite }),
  });

  const [isFavorite, setFavorite] = useState(undefined);

  return;
}
