import { NextResponse } from "next/server";
// client-components cant be async

export async function GET(req, context) {
  const id = context?.params?.id;
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch detailmovie-data");
    }
    const movie = await res.json();
    console.log("Movie in page.js: ", movie);

    return NextResponse.json(movie);
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
