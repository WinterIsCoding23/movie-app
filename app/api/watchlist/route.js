import { NextResponse } from "next/server";
import dbConnect from "../../../db/connect";
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

    return new NextResponse(JSON.stringify(moviesOnWatchlist), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ status: "Internal server error" }),
      {
        status: 500,
      }
    );
  }
}

// Original POST():
// export async function POST() {
//   await dbConnect();

//   try {
//     const movieData = request.body;
//     const movie = new WatchlistMovie(movieData);
//     await movie.save();
//     response.status(201).json({ status: "Favorite movie saved" });
//   } catch (error) {
//     console.log(error);
//     response.status(400).json({ error: error.message });
//   }

//   if (response.ok) {
//     await response.json();
//   } else {
//     console.error(`Error: ${response.status}`);
//   }
// }
