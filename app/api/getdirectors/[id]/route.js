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
    // const directorData = jsonData.crew?.filter(({ job }) => job === "Director");
    // const director = directorData[0].original_name;
    // console.log("director in page.js: ", director);
    const directorData =
      jsonData.crew.length > 0
        ? jsonData.crew?.filter(({ job }) => job === "Director")
        : [];
    // const directorData = jsonData.crew?.filter(({ job }) => job === "Director");
    // const director = directorData[0].original_name;
    const directors =
      directorData !== []
        ? directorData.map((director) => director.original_name)
        : "Unfortunately, no trace of any director.";

    return NextResponse.json(directors);
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
