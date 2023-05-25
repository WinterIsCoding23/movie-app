"use client";

import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";

const imagePath = "https://image.tmdb.org/t/p/original";

export default async function GetSearchResults({ url, searchParams }) {
  console.log("searchParams in GetSearchResults:", searchParams);

  // SWR:
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const URL = url;
  const { data, error, isLoading } = useSWR(URL, fetcher);
  console.log("data.results: ", data.results);

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
      <div>
        {data.results.map((result) => (
          <div key={result.id}>
            <h2>{result.title}</h2>
            {console.log(imagePath + result.poster_path)}
            <Link href={`/movie/${result.id}`}>
              <Image
                alt={result.title}
                width={100}
                height={100}
                src={imagePath + result.poster_path}
              />
            </Link>
            <h3>{result.genre_ids}</h3>
            <p>{result.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
