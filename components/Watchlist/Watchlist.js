"use client";

import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styles from "./Watchlist.module.css";

export default function Watchlist() {
  // useState for Slider
  const [sliderRef, setSliderRef] = useState(null);

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

  // Slick-Slider:
  const sliderSettings = {
    dots: true,
    arrows: false,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    speed: 500,
    infinite: true,
    centerPadding: "60px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 0,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 0,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 0,
          infinite: true,
          dots: true,
        },
      },
    ],
  };
  // console.log("moviesOnWatchlist: ", moviesOnWatchlist);

  // randomMovieOnWatchlist: suggest a random watchlist-movie
  // ...that is available for streaming
  const filteredMoviesOnWatchlist = moviesOnWatchlist.filter(
    (movieOnWatchlist) =>
      movieOnWatchlist.isFavorite === true &&
      movieOnWatchlist.streamingSources.length > 0
  );

  const randomMovieOnWatchlist =
    filteredMoviesOnWatchlist[
      Math.floor(Math.random() * filteredMoviesOnWatchlist.length)
    ];

  return (
    <div className={styles.watchlistContainer}>
      <h2 className={styles.watchlistHeader}>My Watchlist</h2>
      {moviesOnWatchlist.length > 0 ? (
        <div className={styles.watchlistMovieBox}>
          <button
            className={styles.watchlistButton}
            onClick={sliderRef?.slickPrev}
          >
            <Image
              src={"/../public/previous.png"}
              width={20}
              height={20}
              alt={"previous"}
            />
          </button>
          <button
            className={styles.watchlistButton}
            onClick={sliderRef?.slickNext}
          >
            <Image
              src={"/../public/next.png"}
              width={20}
              height={20}
              alt={"previous"}
            />
          </button>
          <Slider
            className={styles.slider}
            ref={setSliderRef}
            {...sliderSettings}
          >
            {moviesOnWatchlist.map((movieOnWatchlist, index) => (
              <div className={styles.sliderContent} key={index}>
                <h3 className={styles.movieOnWatchlistTitle}>
                  {movieOnWatchlist.title}
                </h3>
                <Link href={`/movie/${movieOnWatchlist.id}`}>
                  {movieOnWatchlist.image !==
                  "https://image.tmdb.org/t/p/originalnull" ? (
                    <Image
                      className={styles.watchlistPoster}
                      src={movieOnWatchlist.image}
                      width={250}
                      height={250}
                      alt={movieOnWatchlist.title}
                      priority={true}
                    />
                  ) : (
                    <Image
                      className={styles.poster}
                      src={"/no-image.png"}
                      width={166.667}
                      height={250}
                      alt={movieOnWatchlist.title}
                    />
                  )}
                </Link>                
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <p className={styles.noMoviesOnWatchlist}>
          Nothing to show here 😪 - how about you start filling your Watchlist?
        </p>
      )}
      {moviesOnWatchlist.length > 1 && filteredMoviesOnWatchlist.length > 0 ? (
        <div>
          <h2 className={styles.watchlistHeader}>
            Stop scrolling - watch this movie tonight:
          </h2>
          <div className={styles.randomMovieOnWatchlistContainer}>
            <h3>{randomMovieOnWatchlist.title}</h3>
            <Link href={`/movie/${randomMovieOnWatchlist.id}`}>
              {randomMovieOnWatchlist.image !==
              "https://image.tmdb.org/t/p/originalnull" ? (
                <Image
                  className={styles.watchlistPoster}
                  src={randomMovieOnWatchlist.image}
                  width={250}
                  height={250}
                  alt={randomMovieOnWatchlist.title}
                  priority={true}
                />
              ) : (
                <Image
                  className={styles.poster}
                  src={"/no-image.png"}
                  width={250}
                  height={250}
                  alt={randomMovieOnWatchlist.title}
                />
              )}
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
