"use client";

import useSWR from "swr";

export default async function GetSearchResults({ url, searchParams }) {
  console.log("searchParams in GetSearchResults:", searchParams);

  // SWR:
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

  return (
    <div>
      <div>{data.results.map((result) => result.title)}</div>
    </div>
  );
}
