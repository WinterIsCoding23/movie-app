import Image from "next/image";

import styles from "./page.module.css";

import RandomMovie from "../components/random-movie/RandomMovie";
import Watchlist from "../components/Watchlist/Watchlist";
import Collapsible from "../components/Collapsible/Collapsible";

async function getData() {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`
  );
  // To fetch fresh data on every fetch request, include inside fetch:
  // { cache: "no-store" }

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Home({ id, title }) {
  const response = await getData();

  return (
    <>
      <main>
        <h1 className={styles.title}>Movie-App</h1>
        <RandomMovie response={response} />
        <Collapsible label={"searchForm"} />
        <Watchlist response={response} id={id} title={title} />
      </main>
      <footer>
        <p>Copyright 2023</p>
      </footer>
    </>
  );
}
