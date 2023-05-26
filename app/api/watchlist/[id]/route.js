import { NextResponse } from "next/server";
import dbConnect from "../../../../db/connect";
import WatchlistMovie from "../../../../db/models/WatchlistMovie";

export async function GET(request, context) {
  const id = context?.params?.id;

  if (!id) {
    return new NextResponse('{ status: "Not found" }', {
      status: 404,
    });
  }

  await dbConnect(); // check if connection to database available

  const moviesOnWatchlist = await WatchlistMovie.findOne({ id }); //check if movie is in mongoDB

  if (!moviesOnWatchlist) {
    return new NextResponse('{ status: "Not found" }', {
      status: 404,
    });
  }

  return new NextResponse(moviesOnWatchlist, { status: 200 }); // response as Boolean? to pass on to components
}

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

  return new NextResponse(null, { status: 200 }); // response as Boolean? to pass on to components
}
