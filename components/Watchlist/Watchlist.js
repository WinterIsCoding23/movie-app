"use client";

import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
// import React, { Component } from "react";
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

  // Slick-Slider:
  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <button
      {...props}
      className={
        "prev-slick-arrow" + (currentSlide === 0 ? " slick-disabled" : "")
      }
      aria-hidden="true"
      aria-disabled={currentSlide === 0 ? true : false}
      type="button"
    >
      Previous
    </button>
  );
  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <button
      {...props}
      className={
        "next-slick-arrow" +
        (currentSlide === slideCount - 1 ? " slick-disabled" : "")
      }
      aria-hidden="true"
      aria-disabled={currentSlide === slideCount - 1 ? true : false}
      type="button"
    >
      Next
    </button>
  );

  const settings = {
    dots: true,
    speed: 500,
    slidesToScroll: 1,
    initialSlide: 0,
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,

    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  console.log("moiesOnWatchlist: ", moviesOnWatchlist);
  const randomIndex = Math.floor(Math.random() * moviesOnWatchlist.length);
  const randomMovieOnWatchlist = moviesOnWatchlist[randomIndex];

  return (
    <div className={styles.watchlistContainer}>
      <h2 className={styles.watchlistHeader}>My Watchlist</h2>
      {moviesOnWatchlist.length > 0 ? (
        <Slider className={styles.slider} {...settings}>
          {moviesOnWatchlist.map((movieOnWatchlist, index) => (
            <div key={index}>
              <h3>{movieOnWatchlist.title}</h3>
              <Link href={`/movie/${movieOnWatchlist.id}`}>
                <Image
                  className={styles.watchlistPoster}
                  src={movieOnWatchlist.image}
                  width={250}
                  height={250}
                  alt={movieOnWatchlist.title}
                  priority={true}
                />
              </Link>
              {/* <p>{String(movieOnWatchlist.isFavorite)}</p> */}
            </div>
          ))}
        </Slider>
      ) : (
        <p className={styles.noMoviesOnWatchlist}>
          Nothing to show here 😪 - how about you start filling your Watchlist?
        </p>
      )}
      {moviesOnWatchlist.length > 1 ? (
        <div className={styles.randomMovieOnWatchlistContainer}>
          <h2>Stop scrolling - watch this movie tonight:</h2>
          <h3>{randomMovieOnWatchlist.title}</h3>
          <Link href={`/movie/${randomMovieOnWatchlist.id}`}>
            <Image
              className={styles.watchlistPoster}
              src={randomMovieOnWatchlist.image}
              width={250}
              height={250}
              alt={randomMovieOnWatchlist.title}
              priority={true}
            />
          </Link>
        </div>
      ) : null}
    </div>
  );
}

//https://react-slick.neostack.com/docs/example/previous-next-methods/
//https://www.newline.co/@dmitryrogozhny/how-to-show-carousel-in-react-applications-with-react-slick--07445c23
//https://blog.openreplay.com/creating-a-simple-carousel-with-react-slick/
//https://stackoverflow.com/questions/72999182/how-to-customize-previous-and-next-buttons-in-slick-slider
//https://stackoverflow.com/questions/49018820/custom-arrows-react-slick

// {Object.values(moviesOnWatchlist).forEach(
//   (movieOnWatchlist) => (
//     <li key={movieOnWatchlist.id}>{movieOnWatchlist.isFavorite}</li>
//   )
//   console.log("movieOnWatchlist: ", movieOnWatchlist)
