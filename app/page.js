"use client";

import useSWR from "swr";

import styles from "./page.module.css";

import RandomMovie from "../components/random-movie/RandomMovie";
import Watchlist from "../components/Watchlist/Watchlist";
import Collapsible from "../components/Collapsible/Collapsible";

// async function getData() {
//   const res = await fetch(
//     `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`
//   );
//   // To fetch fresh data on every fetch request, include inside fetch:
//   // { cache: "no-store" }

//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }
//   return res.json();
// }

// Data-fetching with SWR:
const fetcher = (...args) => fetch(...args).then((res) => res.json());
const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`;

export default async function Home({ id, title }) {
  const { data, error, isLoading } = useSWR(URL, fetcher);
  // Data-fetching BEFORE SWR:
  // const response = await getData();
  console.log("data: ", data);
  
  return (
    <>
      <main>
        <h1 className={styles.title}>Movie-App</h1>
        <RandomMovie response={data} />
        <Collapsible label={"searchForm"} />
        <Watchlist response={data} id={id} title={title} />
      </main>
      <footer>
        <p>Copyright 2023</p>
      </footer>
    </>
  );
}
