export default function GetDirector({ id }) {
  console.log("id in GetDirector", id);
  const res = fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.API_KEY}`
  );

  const jsonData = res.json();
  const directorData = jsonData.crew?.filter(({ job }) => job === "Director");
  const director = directorData[0].original_name;

  return director;
}
