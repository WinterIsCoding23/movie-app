import GetSearchResults from "../../components/GetSearchResults/GetSearchResults";
import FetchSearchUrl from "../../utils/FetchSearchUrl";

// function returning data from TMDB
//params/useSearchParams

// const URL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${query}`;
// `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=Jack+Reacher`;

// export default async function handler(req, res) {
//   res.status(200).json();

//   if (request.method === "GET") {
//     const movies = await movie.find(URL);
//     return res.status(200).json(movies);
//   }
// }

export default function SearchResults({ params, searchParams }) {
  console.log("searchParamsInSearchResults:", searchParams);

  const query = searchParams.title;
  console.log("query:", query);

  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${query}`;

  // const url = `${FetchSearchUrl()}&query=${query}`;
  console.log("url:", url);

  // const query = searchParams.title;

  // const response = await fetch(
  //   `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${query}`
  // );

  return (
    <div>
      <h2>Greetings from search-results/page.js</h2>
      {/* <div>{search}</div> */}
      <GetSearchResults url={url} searchParams={searchParams} />
    </div>
  );
}
