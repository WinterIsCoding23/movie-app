import MovieDetailsFavorites from "./Isfavorite";

export default async function MoviePage({ params: { id } }) {
  return <MovieDetailsFavorites id={id} />;
}

// old code:
// export const detailUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}`;

// export async function getMovie(id) {
//   const res = await fetch(
//     `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}`
//   );
//   return res.json();
// }
////////////////////////////////////////////////////////////////////////////
// let movieData = await getMovie(id);
// const [movie] = await Promise.all([movieData]);
// const movieId = movie.id;
// console.log("Movie in page.js: ", movie);

// const imagePath = "https://image.tmdb.org/t/p/original";

//fetch from mongoDB:
// let isFavorite = false;
// if (movieId) {
//   const response = await fetch(
//     `http://localhost:3000/api/watchlist/${movieId}`,
//     {
//       method: "GET",
//       // set headers to inform about incoming response in json-format -> server formats accordingly
//       // ...otherwise throws error: Uncaught Error: Unexpected token _ in JSON at position 4"
//       headers: {
//         "Content-type": "application/json",
//       },
//     }
//   );
//   if (response.ok) {
//     // console.log("response ", response);
//     const jsonData = await response.json();
//     console.log("jsonData: ", jsonData);
//     isFavorite = jsonData.isFavorite;
//     movieData = { ...movieData, isFavorite: isFavorite };
//   } else {
//     console.log("not found");
//   }
// }
