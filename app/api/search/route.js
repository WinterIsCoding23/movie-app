// This file will export an asynchronous function named with your desired HTTP request: GET, HEAD, POST, PUT, DELETE, etc.
// https://blog.logrocket.com/using-next-js-route-handlers/
import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`
  );
  const data = await res.json();
  return NextResponse.json(data);
}

// function returning data from TMDB

// const URL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${query}`;

// export default async function handler(req, res) {
//   res.status(200).json();

//   if (request.method === "GET") {
//     const movies = await movie.find(URL);
//     return res.status(200).json(movies);
//   }
// }
