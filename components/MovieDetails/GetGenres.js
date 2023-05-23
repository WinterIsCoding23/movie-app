export default async function GetGenres({ id }) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}`
  );

  const jsonData = await res.json(); //json-object

  const genres = jsonData.genres.map((genre) =>
    genre === jsonData.genres[jsonData.genres.length - 1]
      ? genre.name
      : genre.name + ", "
  ); // array of genres

  return genres;
}
