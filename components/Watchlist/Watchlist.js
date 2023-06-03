"use client";

import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styles from "./Watchlist.module.css";

export default function Watchlist() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const {
    data: moviesOnWatchlist,
    error,
    isLoading: isLoadingMoviesOnWatchlist,
  } = useSWR(`/api/watchlist`, fetcher);

  if (isLoadingMoviesOnWatchlist) {
    return <div>Loading Watchlist...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const imagePath = "https://image.tmdb.org/t/p/original";

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className={styles.watchlistContainer}>
      <h2 className={styles.watchlistHeader}>My Watchlist</h2>
      <Slider {...settings}>
        {moviesOnWatchlist.map((movieOnWatchlist, index) => (
          <div key={index}>
            <h3>{movieOnWatchlist.title}</h3>
            <Link href={`/movie/${movieOnWatchlist.id}`}>
              <Image
                src={movieOnWatchlist.image}
                width={250}
                height={250}
                alt={movieOnWatchlist.title}
                priority={true}
              />
            </Link>
            <p>{String(movieOnWatchlist.isFavorite)}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
}

// {Object.values(moviesOnWatchlist).forEach(
//   (movieOnWatchlist) => (
//     <li key={movieOnWatchlist.id}>{movieOnWatchlist.isFavorite}</li>
//   )
//   console.log("movieOnWatchlist: ", movieOnWatchlist)
