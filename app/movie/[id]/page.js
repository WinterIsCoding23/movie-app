import Image from "next/image";

import styles from "./Movie.module.css";

async function getMovie(id) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}`
  );
  return res.json();
}

export default async function MoviePage({ params: { id } }) {
  // console.log("id ", id);

  const movieData = getMovie(id);
  // console.log("movieData ", movieData);

  const [movie] = await Promise.all([movieData]);

  const imagePath = "https://image.tmdb.org/t/p/original";

  // Get director:
  async function getDirector(id) {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.API_KEY}`
    );

    const jsonData = await res.json();
    const directorData = jsonData.crew.filter(({ job }) => job === "Director");
    const director = directorData[0].original_name;

    return director;
  }

  // Get cast:
  async function getCast(id) {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.API_KEY}`
    );

    const jsonData = await res.json(); //json-object

    // cast if jsonData.cast.length > 9
    const firstTenCastMembersData = jsonData.cast.slice(0, 10); //array of objects
    console.log(
      "firstTenCastMembersData 9: ",
      firstTenCastMembersData[firstTenCastMembersData.length - 1]
    );
    const firstTenCastMembers = firstTenCastMembersData.map((member) =>
      member === firstTenCastMembersData[firstTenCastMembersData.length - 1]
        ? member.name + " and others"
        : member.name + ", "
    ); // array of names (string)

    // cast if jsonData.cast.length <= 9
    const shortCastData = jsonData.cast; // array of objects
    const shortCastMembers = shortCastData.map((member) =>
      member === shortCastData[shortCastData.length - 1]
        ? "and " + member.name
        : member.name + ", "
    ); // array of names

    return jsonData.cast.length > 9 ? firstTenCastMembers : shortCastMembers;
  }

  // Get streaming:
  async function getStreaming(id) {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${process.env.API_KEY}`
    );
    // console.log("fetched getStreaming: ", res);
    const jsonData = await res.json();
    // console.log("jsonData: ", jsonData);
    const streamingSources = jsonData?.results?.DE?.flatrate?.map(
      (element) => imagePath + element.logo_path
    );

    const unavailable =
      "Unfortunately this movie is currently not being streamed in Germany.";

    if (streamingSources) {
      // console.log("streamingSource: ", streamingSource);
      return (
        <ul style={{ listStyle: "none" }}>
          <li key={movie.id}>
            {streamingSources.map((streamingSource) => (
              <Image
                src={streamingSource}
                width={80}
                height={80}
                alt={movie.title}
                style={{ borderRadius: 20, padding: 10 }}
              />
            ))}
          </li>
        </ul>
      );
    } else {
      return unavailable;
    }
  }

  return (
    <div className={styles.movieContainer}>
      <h2 className={styles.title}>{movie.title}</h2>
      {/* <p>Genres: {movie.genre_ids.map((genre) => genre)}</p> */}
      <Image
        className={styles.poster}
        src={imagePath + movie.poster_path}
        width={250}
        height={250}
        alt={movie.title}
      />

      <h4 className={styles.directorTitle}>Director:</h4>
      <p className={styles.directorInfo}>{await getDirector(movie.id)}</p>

      <h4 className={styles.castTitle}>Cast:</h4>
      <p className={styles.castInfo}>{await getCast(movie.id)}</p>
      <h4 className={styles.synopsisTitle}>Synopsis:</h4>
      <p className={styles.synopsisText}>{movie.overview}</p>
      <div className={styles.releaseContainer}>
        <h4 className={styles.releaseTitle}>Release-date:</h4>
        <p className={styles.releaseDate}>{movie.release_date}</p>
      </div>
      <div className={styles.languageContainer}>
        <h4 className={styles.languageTitle}>Original language:</h4>
        <p className={styles.languageInfo}>
          {movie.original_language.toUpperCase()}
        </p>
      </div>
      <div className={styles.streamingContainer}>
        <h4 className={styles.streamingTitle}>Streaming-options:</h4>
        <div className={styles.streamingInfo}>{await getStreaming(id)}</div>
      </div>
    </div>
  );
}
