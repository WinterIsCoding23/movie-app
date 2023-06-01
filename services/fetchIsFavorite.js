export default async function getMovieDetails({ id }) {
  let movieData = await getMovie(id);
  const [movie] = await Promise.all([movieData]);
  return movie;
}
