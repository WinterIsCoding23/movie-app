import { NextResponse } from "next/server";
import dbConnect from "../../../../db/connect";
import WatchlistMovie from "../../../../db/models/WatchlistMovie";

// GET-request
// ... to get movie-object from mongoDB & check if isFavorite === true
export async function GET(request, context) {
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

  const isFavorite = movieOnWatchlist.isFavorite;
  const response = {
    movie: movieOnWatchlist,
    isFavorite: isFavorite,
  };

  // return movie-object (with given id) from mongoDB
  return NextResponse.json(response);
}

// PUT-request
// ...to save movie with id XX and key isFavorite === true / update movie with id XX if key isFavorite === false
export async function PUT(request, context) {
  const id = context?.params?.id;
  const isFavoriteObj = await request.json();
  console.log("isFavoriteObj in api/watchlist/[id]/route.js: ", isFavoriteObj);

  if (!id) {
    return new NextResponse(
      { status: "Not found" },
      {
        status: 404,
      }
    );
  }
// check if connection to database available
  await dbConnect(); 

  //update movie if movie is in mongoDB
  const movieToUpdate = await WatchlistMovie.updateOne(
    { id },
    { $set: isFavoriteObj },
    { upsert: true },
    (error, result) => {
      if (error) {
        console.error("Error:", error);
      } else {
        console.log("Result:", result);
      }
    }
  ); 
  //check if movie is in mongoDB:
  if (!movieToUpdate) {
    return new NextResponse(
      { status: "Not found" },
      {
        status: 404,
      }
    );
  }
// return movie-object (with given id) from mongoDB
  return NextResponse.json(await WatchlistMovie.findOne({ id }));
}

// DELETE-request --> not yet needed...
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
