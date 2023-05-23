// function returning data from TMDB

// handler function res, req

export default async function handler(req, res) {
  res.status(200).json();

  const URL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=Jack+Reacher`;

  if (request.method === "GET") {
    const movies = await movie.find(URL);
    return res.status(200).json(movies);
  }
}
