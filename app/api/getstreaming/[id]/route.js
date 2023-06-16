import { NextResponse } from "next/server";

export async function GET(req, context) {
  const imagePath = "https://image.tmdb.org/t/p/original";
  const id = context?.params?.id;

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${process.env.API_KEY}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch streaming data");
    }
    const unavailable =
      "Unfortunately, this movie is currently not being streamed in Germany.";

    const jsonData = await res.json();    
    const streamingResults = jsonData.results;    

    // check if the movie is streaming in DE & if so, return the results in .flatrate (object),
    // ...otherwise return unavailable (string)
    
    // alternatively:
    // const streamingDataDe =
    //   streamingResults.hasOwnProperty("DE") &&
    //   streamingResults.DE.hasOwnProperty("flatrate")
    //     ? streamingResults.DE.flatrate
    //     : unavailable;
    
    const streamingDataDe = streamingResults?.DE?.flatrate ?? unavailable;
    
    const streamingSources =
      streamingDataDe !== unavailable
        ? streamingDataDe.map((element) => imagePath + element.logo_path)
        : unavailable;

    return NextResponse.json(streamingSources);
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
