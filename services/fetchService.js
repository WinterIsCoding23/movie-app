import dbConnect from "../db/connect";

export const THEMOVIEDB_BASE_URL = "http://api.themoviedb.org/3";
// export const THEMOVIEDB_BASE_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`
// export const imagePath = "https://image.tmdb.org/t/p/original";

export async function getMovies() {
  try {
    const response = await fetch(
      `${THEMOVIEDB_BASE_URL}/movie/popular?api_key=${process.env.API_KEY}`
    ); // optional within fetch(): ", {}" -> headers, body, etc.
    const moviesData = await response.json();
    const movies = await moviesData.results; //array

    await dbConnect();
    // return movies.map(async (movie) => {
    //   return {
    //     ...movie,
    // movie: object
    // isInWatchList: await Watchlist.findById(movie.id),
    // director: getDirector(movie),
    // genres: getLeadingCommentRanges(movie),
    //   };
    // });
    return movies;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function getRandomMovie() {
  // console.log("getMovies: ", await getMovies());
  const possibleRandomMovies = await getMovies();
  // console.log("movies: ", movies);
  const randomMovie =
    possibleRandomMovies[
      Math.floor(Math.random() * possibleRandomMovies.length)
    ];

  return randomMovie;
}

export async function getDirector(movie) {
  return await fetch(`${movie.id}`);
}

export async function getFavoriteMovies() {
  return (await getMovies()).filter((movie) => movie.isInWatchList);
}
