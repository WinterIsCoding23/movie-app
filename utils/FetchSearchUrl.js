// import "server-only";

export default async function FetchSearchUrl() {
  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}`;
  return searchUrl;
}
