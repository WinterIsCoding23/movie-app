import SearchForm from "../../components/Collapsible/SearchForm";

export default function searchResults() {
  const URL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=Jack+Reacher`;

  return (
    <div>
      <h1>Search Results</h1>
      <div>Results-container</div>
    </div>
  );
}
