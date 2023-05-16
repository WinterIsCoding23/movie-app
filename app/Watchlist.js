import Image from "next/image";

import styles from "./Watchlist.module.css";

export default function Watchlist({ response, data, id, title }) {
  const imagePath = "https://image.tmdb.org/t/p/original";

  return (
    <div>
      <h2>My Watchlist</h2>
      <ul>
        {response.results.map((movie) => (
          <li key={movie.id}>
            <h3>{movie.title}</h3>
            <Image
              className={styles.imageContainer}
              src={imagePath + movie.poster_path}
              width={50}
              height={50}
              alt={movie.title}
              priority={true}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
