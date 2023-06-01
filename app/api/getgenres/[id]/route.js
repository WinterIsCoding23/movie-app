import { NextResponse } from "next/server";
// client-components cant be async

export async function GET(req, context) {
  const id = context?.params?.id;
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch genres-data");
    }
    const jsonData = await res.json();
    const genres = jsonData.genres.map((genre) =>
      genre === jsonData.genres[jsonData.genres.length - 1]
        ? genre.name
        : genre.name + ", "
    ); // array of genres

    console.log("genres in page.js: ", genres);

    return NextResponse.json(genres);
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
