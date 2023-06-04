import { NextResponse } from "next/server";
import dbConnect from "../../../../db/connect";
import WatchlistMovie from "../../../db/models/WatchlistMovie";

export async function GET(request, context) {
  try {
    await dbConnect(); // Check if connection to the database is available

    const moviesOnWatchlist = await WatchlistMovie.find({
      isFavorite: true,
    });
    console.log("moviesOnWatchlist", moviesOnWatchlist);

    if (!moviesOnWatchlist) {
      return new NextResponse(JSON.stringify({ status: "Not found" }), {
        status: 404,
      });
    }

    const randomNumber = Math.floor(Math.random() * moviesOnWatchlist.length);
    const randomMovieOnWatchlist = moviesOnWatchlist[randomNumber];

    return new NextResponse(JSON.stringify(randomMovieOnWatchlist), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ status: "Internal server error" }),
      {
        status: 500,
      }
    );
  }
}
