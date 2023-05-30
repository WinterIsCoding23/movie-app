import { NextResponse } from "next/server";
import dbConnect from "../../../../db/connect";
import WatchlistMovie from "../../../../db/models/WatchlistMovie";

// GET-request
// ... to get movie-object from mongoDB & check if isFavorite === true
export async function GET(request, context) {
  const id = context?.params?.id;

  if (!id) {
    return new NextResponse('{ status: "Id not found" }', {
      status: 404,
    });
  }

  // check if connection to database available
  await dbConnect();

  //check if movie is in mongoDB
  const movieOnWatchlist = await WatchlistMovie.findOne({ id });

  if (!movieOnWatchlist) {
    return new NextResponse('{ status: "movieOnWatchlist Not found" }', {
      status: 404,
    });
  }

  // return movie-object (with given id) from mongoDB
  return new NextResponse(movieOnWatchlist, { status: 200 });
}

// PUT-request
// ...to save movie with id XX and key isFavorite === true / update movie with id XX if key isFavorite === false
export async function PUT(request, context) {
  const id = context?.params?.id;

  if (!id) {
    return new NextResponse('{ status: "Not found" }', {
      status: 404,
    });
  }

  await dbConnect(); // check if connection to database available

  // let isFavoriteObj = {};
  // isFavoriteObj[isFavorite] = watchlistFavorite;

  const movieToUpdate = await WatchlistMovie.updateOne(
    { id },
    { $set: { isFavorite: watchlistFavorite } },
    { upsert: true },
    (error, result) => {
      if (error) {
        console.error("Error:", error);
      } else {
        console.log("Result:", result);
      }
    }
  ); //check if movie is in mongoDB

  if (!movieToUpdate) {
    return new NextResponse('{ status: "Not found" }', {
      status: 404,
    });
  }

  return new NextResponse(movieToUpdate, { status: 200 });
}

// DELETE-request --> needed?
export async function DELETE(request, context) {
  const id = context?.params?.id;
  const errorResponse = response.status(404).json({ status: "Not found" });

  if (!id) {
    return errorResponse;
  }

  await dbConnect(); // check if connection to database available

  const moviesOnWatchlist = await WatchlistMovie.findOneAndDelete({ id }); //check if movie is in mongoDB

  if (!moviesOnWatchlist) {
    return errorResponse;
  }

  return new NextResponse(null, { status: 200 });
}
