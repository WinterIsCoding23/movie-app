// import "server-only";

export default async function FetchUrl() {
  const fetchUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`;
  return fetchUrl;
}
