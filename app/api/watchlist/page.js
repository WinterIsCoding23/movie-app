import dbConnect from "../../../db/connect";
import WatchlistMovies from "../../../db/models/WatchlistMovie";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const moviesOnWatchlist = await WatchlistMovies.find();
    if (!moviesOnWatchlist) {
      return response.status(404).json({ status: "Not found" });
    }

    return response.status(200).json(moviesOnWatchlist);
  } else if (request.method === "POST") {
    // const movieToUpdate = await WatchlistMovies.findByIdAndUpdate(id, {
    //   $set: request.body,
    // });

    // response
    //   .status(200)
    //   .json(movieToUpdate, { status: "Movie successfully updated" });

    const movieData = request.body;
    const movie = new WatchlistMovies(movieData);

    const response = await fetch("/api/watchlist", {
      method: "POST",
      body: JSON.stringify(movie),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      await response.json();
    } else {
      console.error(`Error: ${response.status}`);
    }
  }

  try {
    const movieData = request.body;
    const movie = new WatchlistMovies(movieData);

    await movie.save();
    response.status(201).json({ status: "Favorite movie saved" });
  } catch (error) {
    console.log(error);
    response.status(400).json({ error: error.message });
  }
}
