import dbConnect from "../../../db/connect";
import watchlistMovies from "../../../db/models/watchlistMovies";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const moviesOnWatchlist = await watchlistMovies.find();
    return response.status(200).json(moviesOnWatchlist);
  } else if (request.method === "POST") {
    try {
      const movieData = request.body;
      const movie = new Place(movieData);

      await movie.save();
      response.status(201).json({ status: "Favorite movie saved" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
