export default async function GetDirector({ id }) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.API_KEY}`
  );

  const jsonData = await res.json();
  const directorData = jsonData.crew.filter(({ job }) => job === "Director");
  const director = directorData[0].original_name;

  return director;
}
