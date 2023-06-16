import styles from "./page.module.css";

import RandomMovie from "../components/Random-movie/RandomMovie";
import Watchlist from "../components/Watchlist/Watchlist";
import PopularWatchlist from "../components/Watchlist/PopularWatchlist";
import FetchUrl from "../utils/FetchUrl";
import Collapsible from "../components/Collapsible/Collapsible";


export default async function Home() {
  return (
    <>
      <main>
        <h1 className={styles.title}>Movie-App</h1>
        <RandomMovie />
        <Collapsible label={"searchForm"} />
        <Watchlist />
        {/* <PopularWatchlist url={await FetchUrl()} /> */}
      </main>
      <footer>
        <p>Copyright 2023</p>
      </footer>
    </>
  );
}
