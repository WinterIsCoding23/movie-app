import { NextResponse } from "next/server";
// client-components cant be async

export async function GET(req, context) {
  const id = context?.params?.id;
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.API_KEY}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch cast-data");
    }
    const jsonData = await res.json();

    // cast if jsonData.cast.length > 9
    const firstTenCastMembersData = jsonData.cast.slice(0, 10); //array of objects
    const firstTenCastMembers = firstTenCastMembersData.map((member) =>
      member === firstTenCastMembersData[firstTenCastMembersData.length - 1]
        ? member.name + " and others"
        : member.name + ", "
    ); // array of names (string)

    // cast if jsonData.cast.length <= 9
    const shortCastData = jsonData.cast; // array of objects
    const shortCastMembers = shortCastData.map((member) =>
      member === shortCastData[shortCastData.length - 1]
        ? "and " + member.name
        : member.name + ", "
    ); // array of names

    return NextResponse.json(
      jsonData.cast.length > 9 ? firstTenCastMembers : shortCastMembers
    );
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
