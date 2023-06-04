export default function GetDirector({ id }) {
  console.log("id in GetDirector", id);
  const res = fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.API_KEY}`
  );

  const jsonData = res.json();
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

  return directors;
}
