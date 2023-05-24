import GetSearchResults from "../../components/GetSearchResults/GetSearchResults";

export default function SearchResults({ params, searchParams }) {
  console.log("searchParamsInSearchResults:", searchParams);

  const query = searchParams.title;
  const queryTitle = searchParams.title;
  const queryDirector = searchParams.director;
  const queryCast = searchParams.cast;
  console.log("query:", query);

  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${query}`;

  console.log("url:", url);

  return (
    <div>
      <h2>Search-results:</h2>
      <GetSearchResults url={url} searchParams={searchParams} />
    </div>
  );
}
