import { NextResponse, NextRequest } from "next/server";
import dbConnect from "../../../db/connect";
import WatchlistMovie from "../../../db/models/WatchlistMovie";

export async function PUT(request, context) {
  const id = context?.params?.id;

  if (!id) {
    return new NextResponse('{ status: "Not found" }', {
      status: 404,
    });
  }

  await dbConnect(); // check if connection to database available

  const moviesOnWatchlist = await WatchlistMovie.updateOne({ id }); //check if movie is in mongoDB

  if (!moviesOnWatchlist) {
    return new NextResponse('{ status: "Not found" }', {
      status: 404,
    });
  }

  return new NextResponse(moviesOnWatchlist, { status: 200 });
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
