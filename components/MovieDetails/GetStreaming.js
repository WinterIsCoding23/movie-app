import Image from "next/image";

export default async function GetStreaming({ id, imagePath, movie }) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${process.env.API_KEY}`
  );
  // console.log("fetched getStreaming: ", res);
  const jsonData = await res.json();
  // console.log("jsonData: ", jsonData);
  const streamingSources = jsonData?.results?.DE?.flatrate?.map(
    (element) => imagePath + element.logo_path
  );

  const unavailable =
    "Unfortunately this movie is currently not being streamed in Germany.";

  if (streamingSources) {
    // console.log("streamingSource: ", streamingSource);
    return (
      <ul style={{ listStyle: "none" }}>
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
    );
  } else {
    return unavailable;
  }
}
