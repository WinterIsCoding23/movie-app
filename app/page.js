"use client";

import Image from "next/image";
import useSWR from "swr";

import styles from "./page.module.css";

import Movie from "./Movie";
import RandomMovie from "./random-movie/RandomMovie";
import SearchButton from "./search-button/SearchButton";
import Watchlist from "./watchlist/Watchlist";
import NavBar from "./navbar/NavBar";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`;

export default async function Home({ id, title }) {
  // Worked without SWR:
  // const data = await fetch(
  //   `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`
  // );

  // const response = await data.json();

  const { data: results } = useSWR(URL, fetcher);
  console.log(results);

  return (
    <body className={styles.body}>
      <main>
        <h1 className={styles.title}>Movie-App</h1>
        <h1>{results}</h1>
        {/* <RandomMovie data={data} /> */}
        {/* {response.results.map((movie) => (
          <Movie
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster_path={movie.poster_path}
          />
        ))} */}
        <SearchButton />
        {/* <Watchlist data={data} id={id} title={title} /> */}
      </main>
      <footer>
        <p>Copyright 2023</p>
      </footer>
      <NavBar />
    </body>
  );
}
