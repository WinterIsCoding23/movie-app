import styles from "./Movie.module.css";
import GetDirector from "../../../../components/MovieDetails/GetDirector";
import GetCast from "../../../../components/MovieDetails/GetCast";
import GetStreaming from "../../../../components/MovieDetails/GetStreaming";
import GetGenres from "../../../../components/MovieDetails/GetGenres";

export default async function fetchMovie(id) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch detailmovie-data");
    }
    const movie = await res.json();
    console.log("Movie in page.js: ", movie);
    console.log("MovieId: ", movieId);

    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
