import Image from "next/image";
import NavBar from "../../navbar/NavBar";

async function getMovie(id) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}`
  );
  return res.json();
}

export default async function MoviePage({ params: { id } }) {
  console.log("id ", id);

  const movieData = getMovie(id);
  console.log("movieData ", movieData);

  const [movie] = await Promise.all([movieData]);

  const imagePath = "https://image.tmdb.org/t/p/original";

  return (
    <>
      <h2>{movie.title}</h2>
      <Image
        src={imagePath + movie.poster_path}
        width={250}
        height={250}
        alt={movie.title}
      />
      <p>{movie.overview}</p>
    </>
  );
}
