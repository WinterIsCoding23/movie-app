// get isFavorite from mongoDB
// needs useEffect for Client-side
// Server-side: create a function "to return yes/no"

import { NextResponse } from "next/server";

export default async function GET(request, context) {
  const id = context?.params?.id;
  let isFavorite = false;

  if (!id) {
    return new NextResponse(
      { status: "Id not found" },
      {
        status: 404,
      }
    );
  }

  // check if connection to database available
  await dbConnect();

  //check if movie is in mongoDB
  const movieOnWatchlist = await WatchlistMovie.findOne({ id });

  if (movieOnWatchlist) {
    isFavorite = movieOnWatchlist.isFavorite;
  }

  // return movie-object (with given id) from mongoDB
  return new NextResponse(movieOnWatchlist, { isFavorite });
}
