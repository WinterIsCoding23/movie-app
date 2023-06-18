import GetSearchResults from "../../components/GetSearchResults/GetSearchResults";
import styles from "./search-results.module.css";

export default function SearchResults({ params, searchParams }) {
  console.log("searchParamsInSearchResults:", searchParams);

  const query = searchParams.title;
  const queryTitle = searchParams.title;
  const queryDirector = searchParams.director;
  const queryCast = searchParams.cast;
  console.log("query:", query);

  // pagination:
  const page = 1; 

  // Search by Title - but included additional query parameters dont work:
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate&query=${query}`;

  // Disover-movie-API
  // https://developer.themoviedb.org/reference/discover-movie
  // const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&with_keywords=${query}`;

  // Sources:
  // https://themoviedb.api-docs.io/3/discover/movie-discover
  // https://www.themoviedb.org/talk/626ab3b0ec370c0d982a3ce6

  // Search by Name:
  // const url = `https://api.themoviedb.org/3/search/person?api_key=${process.env.API_KEY}&include_adult=false&language=en-US&query=${query}`;
  // Sources:
  // https://developer.themoviedb.org/reference/search-person

  // Pagination:
  // 20 results per page:
  // https://www.themoviedb.org/talk/587bea71c3a36846c300ff73

  console.log("url:", url);

  return (
    <div>
      <h2 className={styles.searchTitle}>Search-results:</h2>
      <GetSearchResults url={url} page={page} searchParams={searchParams} />
    </div>
  );
}
