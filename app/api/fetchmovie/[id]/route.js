import { NextResponse } from "next/server";
// client-components cant be async

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
    console.log("Movie in page.js: ", movie);

    return NextResponse.json(movie);
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}


// return NextResponse.error({
//   status: 500,
//   body: { error: "Failed to fetch movie data" },
// });
