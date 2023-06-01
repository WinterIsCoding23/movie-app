import { NextResponse } from "next/server";
// client-components cant be async

export async function GET(req, context) {
  const id = context?.params?.id;
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.API_KEY}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch director-data");
    }
    const jsonData = await res.json();
    const directorData = jsonData.crew?.filter(({ job }) => job === "Director");
    const director = directorData[0].original_name;
    console.log("director in page.js: ", director);

    return NextResponse.json(director);
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
