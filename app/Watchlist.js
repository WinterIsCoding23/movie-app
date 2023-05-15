export default function Watchlist({ response, data, id, title }) {
  return (
    <div>
      <h2>My Watchlist</h2>
      <ul>
        {response.results.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}
