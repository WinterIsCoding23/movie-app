import dbConnect from "../../../db/connect";
import WatchlistMovie from "../../../db/models/WatchlistMovie";

// import movie.id

// ?? POST
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
