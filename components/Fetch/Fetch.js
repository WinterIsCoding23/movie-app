"use client";

// import FetchUrl from "../../utils/FetchUrl";

import useSWR from "swr";

export default async function Fetch({ data }) {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`;
  console.log("URL: ", URL);

  const { data } = useSWR(await FetchUrl(), fetcher);

  if (!data) {
    return <h1>Loading...</h1>;
  }

  return data;
}
