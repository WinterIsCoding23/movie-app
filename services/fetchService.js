export const THEMOVIEDB_BASE_URL = "http://api.themoviedb.org";

export async function getMovies() {
  try {
    const response = await fetch(`${THEMOVIEDB_BASE_URL}/movies/`, {});
    const movies = await response.json();

    await dbConnect();
    return movies.map(async (movie) => {
      return {
        ...movie,
        isInWatchList: await Watchlist.findById(movie.id),
        director: getDirector(movie),
        genres: getLeadingCommentRanges(movie),
      };
    });
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function getDirector(movie) {
  return await fetch(`${movie.id}`);
}

export async function getRandomMovie() {
  const movies = await getMovies();

  return movies[Math.random() * movies.length];
}

export async function getFavoriteMovies() {
  return (await getMovies()).filter((movie) => movie.isInWatchList);
}
