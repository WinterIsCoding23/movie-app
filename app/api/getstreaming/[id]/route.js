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
    // console.log("jsonData: ", jsonData);
    const streamingResults = jsonData.results;
    // console.log("streamingResults: ", streamingResults);

    // check if the movie is streaming in DE & if so, return the results in .flatrate (object),
    // ...otherwise return unavailable (string)
    const streamingDataDe = streamingResults?.DE?.flatrate ?? unavailable;

    // alternatively:
    // const streamingDataDe =
    //   streamingResults.hasOwnProperty("DE") &&
    //   streamingResults.DE.hasOwnProperty("flatrate")
    //     ? streamingResults.DE.flatrate
    //     : unavailable;

    console.log("streamingDataDe: ", streamingDataDe);

    const streamingSources =
      streamingDataDe !== unavailable
        ? streamingDataDe.map((element) => imagePath + element.logo_path)
        : unavailable;

    return NextResponse.json(streamingSources);
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}

// original code:
// import { NextResponse } from "next/server";
// import Image from "next/image";
// client-components cant be async

// export async function GET(req, context) {
//   const imagePath = "https://image.tmdb.org/t/p/original";
//   const id = context?.params?.id;

//   try {
//     const res = await fetch(
//       `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${process.env.API_KEY}`
//     );
//     if (!res.ok) {
//       throw new Error("Failed to fetch streaming-data");
//     }
//     const jsonData = await res.json();
//     console.log("jsonData in getstreaming: ", jsonData);
//     const streamingDataDE = jsonData?.results?.DE?.flatrate; // array of objects
//     const streamingSources = streamingDataDE?.map(
//       (element) => imagePath + element.logo_path
//     ); // object
//     const unavailable =
//       "Unfortunately this movie is currently not being streamed in Germany.";

//     console.log("streamingSources in page.js: ", streamingSources);

//     return NextResponse.json(
//       streamingSources ? (
//         <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
//           <li key={index}>
//             {streamingSources.map((streamingSource) => (
//               <Image
//                 src={streamingSource}
//                 width={80}
//                 height={80}
//                 alt={streamingSource}
//                 style={{ borderRadius: 20, padding: 10 }}
//               />
//             ))}
//           </li>
//         </ul>
//       ) : (
//         unavailable
//       )
//     );
//   } catch (error) {
//     return NextResponse.json({ message: error.message });
//   }
// }
