// function returning data from TMDB

const URL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${query}`;

export default async function handler(req, res) {
  res.status(200).json();

  if (request.method === "GET") {
    const movies = await movie.find(URL);
    return res.status(200).json(movies);
  }
}
