import MovieDetails from "../../../components/MovieDetails/MovieDetails";

export default async function MoviePage({ params: { id } }) {
  return <MovieDetails id={id} />;
}


