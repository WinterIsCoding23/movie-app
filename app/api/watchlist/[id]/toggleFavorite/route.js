import { NextResponse } from "next/server";

export async function PUT(request, context) {
  const id = context?.params?.id;

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

  if (!movieOnWatchlist) {
    return new NextResponse(
      { status: "movieOnWatchlist Not found" },
      {
        status: 404,
      }
    );
  }

  // return movie-object (with given id) from mongoDB
  return NextResponse.json(movieOnWatchlist);
}
