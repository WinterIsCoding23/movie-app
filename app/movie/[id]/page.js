import MovieDetailsFavorites from "../../../components/IsFavorite/Isfavorite";

export default async function MoviePage({ params: { id } }) {
  return <MovieDetailsFavorites id={id} />;
}


