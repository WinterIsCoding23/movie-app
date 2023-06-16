import { NextResponse } from "next/server";

export async function GET(req, context) {
  const id = context?.params?.id;
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}`
    );
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(`Failed to fetch movie-data: ${errorData.message}`);
    }
    const jsonData = await res.json();
    const movie = jsonData; 
    
    return NextResponse.json(movie);
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
