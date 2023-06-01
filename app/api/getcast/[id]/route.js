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
    console.log("jsonData in getcast: ", jsonData);

    // cast if jsonData.cast.length > 9
    const firstTenCastMembersData = jsonData.cast.slice(0, 10); //array of objects
    const firstTenCastMembers = firstTenCastMembersData.map((member) =>
      member === firstTenCastMembersData[firstTenCastMembersData.length - 1]
        ? member.name + " and others"
        : member.name + ", "
    ); // array of names (string)
    console.log("firstTenCastMembers: ", firstTenCastMembers);
    // cast if jsonData.cast.length <= 9 OR 0 (animation!)
    const shortCastData = jsonData.cast; // array of objects
    let shortCastMembers = [];

    if (shortCastData.length === 0) {
      shortCastMembers = ["No cast members available."];
    } else {
      shortCastMembers = shortCastData.map((member, index) => {
        if (index === shortCastData.length - 1) {
          return "and " + member.name;
        } else {
          return member.name + ", ";
        }
      });
    }
    // array of names
    console.log("shortCastMembers: ", shortCastMembers);

    return NextResponse.json(
      jsonData.cast.length > 9 ? firstTenCastMembers : shortCastMembers
    );
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}