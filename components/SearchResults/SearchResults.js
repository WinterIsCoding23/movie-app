"use client";

import useSWR from "swr";

export default function SearchResults({ url, searchParams }) {
  const query = searchParams.title;

  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${query}`
  );

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const URL = url;
  const { data, error, isLoading } = useSWR(URL, fetcher);

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!data) {
    return <h1>Loading...</h1>;
  }


  return <div>Search-Results</div>;
}
