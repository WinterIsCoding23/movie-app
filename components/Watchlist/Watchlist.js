"use client";

import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";

import { useState } from "react";
import Slider from "react-slick";
// import { FaChevronLeft, FaChevronRight } from "react-icons";
// import React, { Component } from "react";
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
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    speed: 500,
    infinite: true,
    centerPadding: "60px",
    // className: "center",
    // centerMode: true,

    // const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    //   <button
    //     {...props}
    //     className={
    //       "prev-slick-arrow" + (currentSlide === 0 ? " slick-disabled" : "")
    //     }
    //     aria-hidden="true"
    //     aria-disabled={currentSlide === 0 ? true : false}
    //     type="button"
    //   >
    //     Previous
    //   </button>
    // );
    // const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    //   <button
    //     {...props}
    //     className={
    //       "next-slick-arrow" +
    //       (currentSlide === slideCount - 1 ? " slick-disabled" : "")
    //     }
    //     aria-hidden="true"
    //     aria-disabled={currentSlide === slideCount - 1 ? true : false}
    //     type="button"
    //   >
    //     Next
    //   </button>
    // );

    // const settings = {
    //   dots: true,
    //   speed: 500,
    //   slidesToScroll: 1,
    //   initialSlide: 0,
    //   className: "center",
    //   centerMode: true,
    //   infinite: true,
    //   centerPadding: "60px",
    //   slidesToShow: 3,
    //   speed: 500,

    // prevArrow: <SlickArrowLeft />,
    // nextArrow: <SlickArrowRight />,

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
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
    ],
  };
  console.log("moiesOnWatchlist: ", moviesOnWatchlist);

  const filteredMoviesOnWatchlist = moviesOnWatchlist.filter(
    (movieOnWatchlist) => movieOnWatchlist.isFavorite === true
  );
  // const randomIndex = Math.floor(
  //   Math.random() * filteredMoviesOnWatchlist.length
  // );
  // const randomMovieOnWatchlist = filteredMoviesOnWatchlist[randomIndex];
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
                {/* <p>{String(movieOnWatchlist.isFavorite)}</p> */}
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
