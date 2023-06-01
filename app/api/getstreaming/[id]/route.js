import { NextResponse } from "next/server";
// client-components cant be async

export async function GET(req, context) {
  const id = context?.params?.id;
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${process.env.API_KEY}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch streaming-data");
    }
    const jsonData = await res.json();
    const streamingSources = jsonData?.results?.DE?.flatrate?.map(
      (element) => imagePath + element.logo_path
    );
    console.log("streamingSources: ", streamingSources);
    const unavailable =
      "Unfortunately this movie is currently not being streamed in Germany.";

    console.log("streamingSources in page.js: ", director);

    return NextResponse.json(
      streamingSources ? (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          <li key={movie.id}>
            {streamingSources.map((streamingSource) => (
              <Image
                src={streamingSource}
                width={80}
                height={80}
                alt={movie.title}
                style={{ borderRadius: 20, padding: 10 }}
              />
            ))}
          </li>
        </ul>
      ) : (
        unavailable
      )
    );
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
