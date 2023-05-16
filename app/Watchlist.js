import Image from "next/image";

export default function Watchlist({ response, data, id, title }) {
  const imagePath = "https://image.tmdb.org/t/p/original";

  return (
    <div>
      <h2>My Watchlist</h2>
      <ul>
        {response.results.map((movie) => (
          <>
            <li key={movie.id}>
              {movie.title}
              <Image
                src={imagePath + movie.poster_path}
                width={250}
                height={250}
                alt={movie.title}
                priority={true}
              />
            </li>
          </>
        ))}
      </ul>
    </div>
  );
}
