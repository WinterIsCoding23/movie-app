"use client";

import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";

import styles from "./GetSearchResults.module.css";

const imagePath = "https://image.tmdb.org/t/p/original";

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
      <div className={styles.searchResultsContainer}>
        {data.results.map((result) => (
          <div className={styles.movieContainer} key={result.id}>
            <h2>{result.title}</h2>
            <div className={styles.imageContainer}>
              <Link href={`/movie/${result.id}`}>
                <Image
                  className={styles.poster}
                  // fill={true}
                  // sizes={"(max-width: 768px) 100vw, (max-width: 1200px) 100vw"}
                  // style={{ objectFit: "cover" }}
                  style={{ width: "100%", height: "auto" }}
                  sizes={"100vw"}
                  width={0}
                  height={0}
                  src={imagePath + result.poster_path}
                  alt={result.title}
                />
              </Link>
            </div>
            <p>{result.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
