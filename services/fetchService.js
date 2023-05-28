import dbConnect from "../db/connect";

export const THEMOVIEDB_BASE_URL = "http://api.themoviedb.org/3/movie";
// export const THEMOVIEDB_BASE_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`
// export const imagePath = "https://image.tmdb.org/t/p/original";
// completely random movie: https://api.themoviedb.org/3/movie/550?api_key=d093465b55cd2b394c2b5f7dd5c6e8e7

// export async function getMovies() {
//   try {
//     const id = ;
//     const response = await fetch(
//       `${THEMOVIEDB_BASE_URL}/${id}?api_key=${process.env.API_KEY}`
//     ); // optional within fetch(): ", {}" -> headers, body, etc.
//     const moviesData = await response.json();
//     const movies = await moviesData.results; //array

//     await dbConnect();
// return movies.map(async (movie) => {
//   return {
//     ...movie,
// movie: object
// isInWatchList: await Watchlist.findById(movie.id),
// director: getDirector(movie),
// genres: getLeadingCommentRanges(movie),
//   };
// });
//     return movies;
//   } catch (e) {
//     console.error(e);
//     return [];
//   }
// }

export async function getRandomMovieUrl() {
  let id;
  while (true) {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&language=en-US&sort_by=primary_release_date.desc&include_adult=false&page=1`
    );
    const randomNumberSource = await response.json();
    const randomNumberMax = randomNumberSource.total_results;
    id = Math.floor(Math.random() * randomNumberMax);

    const movieResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}`
    );
    const movieData = await movieResponse.json();

    if (movieData.title !== undefined) {
      break;
    }
  }

  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}`;
  return url;
}

export async function getRandomMovie() {
  const URL = await getRandomMovieUrl();
  try {
    const randomMovieData = await fetch(URL);
    const randomMovie = await randomMovieData.json();
    return randomMovie;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function getDirector(movie) {
  return await fetch(`${movie.id}`);
}

export async function getFavoriteMovies() {
  return (await getMovies()).filter((movie) => movie.isInWatchList);
}
