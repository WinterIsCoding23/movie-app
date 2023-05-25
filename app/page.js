import styles from "./page.module.css";

import FetchUrl from "../utils/FetchUrl";
import RandomMovie from "../components/Random-movie/RandomMovie";
import Watchlist from "../components/Watchlist/Watchlist";
import Collapsible from "../components/Collapsible/Collapsible";

// Data-fetching BEFORE SWR:
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

export default async function Home() {
  // Data-fetching BEFORE SWR:
  // const response = await getData();
  // console.log("data: ", data);

  return (
    <>
      <main>
        <h1 className={styles.title}>Movie-App</h1>
        <RandomMovie url={await FetchUrl()} />
        <Collapsible label={"searchForm"} />
        <Watchlist url={await FetchUrl()} />
      </main>
      <footer>
        <p>Copyright 2023</p>
      </footer>
    </>
  );
}
