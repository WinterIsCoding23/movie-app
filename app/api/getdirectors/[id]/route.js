import { NextResponse } from "next/server";

export async function GET(req, context) {
  const id = context?.params?.id;
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.API_KEY}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch director data");
    }
    const jsonData = await res.json();
    const directorData =
      jsonData.crew.length > 0
        ? jsonData.crew?.filter(({ job }) => job === "Director")
        : [];

    let directors = ""; 

    switch (directorData.length) {
      case 0:
        directors = "Unfortunately, no trace of any director.";
        break;
      case 1:
        directors = directorData[0].original_name;
        break;
      case 2:
        directors = `${directorData[0].original_name} and ${directorData[1].original_name}`;
        break;
        default:
          const directorNames = directorData.map((director, index) => {
            if (index === directorData.length - 2) {
              return director.original_name;
            } else if (index === directorData.length - 1) {
              return `and ${director.original_name}`;
            } else {
              return director.original_name + ",";
            }
          });
          directors = directorNames.join(" ");
          break;
    }

    console.log("Directors: ", directors);

    return NextResponse.json( directors );
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
