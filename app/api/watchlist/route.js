import dbConnect from "../../../db/connect";
import WatchlistMovie from "../../../db/models/WatchlistMovie";

// import movie.id

export async function GET() {
  await dbConnect(); //connection to database available?

  const moviesOnWatchlist = await WatchlistMovie.findOne({ id }); //check if movie is in mongoDB

  if (!moviesOnWatchlist) {
    return response.status(404).json({ status: "Not found" });
  }

  return response.status(200).json(moviesOnWatchlist);
}

export async function POST() {
  await dbConnect();

  try {
    const movieData = request.body;
    const movie = new WatchlistMovie(movieData);
    await movie.save();
    response.status(201).json({ status: "Favorite movie saved" });
  } catch (error) {
    console.log(error);
    response.status(400).json({ error: error.message });
  }

  if (response.ok) {
    await response.json();
  } else {
    console.error(`Error: ${response.status}`);
  }
}
