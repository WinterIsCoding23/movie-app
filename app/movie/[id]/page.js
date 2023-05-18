import Image from "next/image";
import NavBar from "../../navbar/NavBar";

export default async function MoviePage({ params }) {
  console.log("params ", params);

  const movieId = params.id;
  console.log("movieId ", movieId);

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}`
  );
  console.log("res ", res);

  const movie = await res.json();
  console.log("movie ", movie);

  return (
    <>
      <div>Movie Detail Page</div>
      <h2>{movie.title}</h2>
      <Image src={movie.poster_path} />
      <p>{movie.overview}</p>
      <NavBar />
    </>
  );
}
