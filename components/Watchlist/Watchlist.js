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

  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <button
      {...props}
      className={
        "slick-prev slick-arrow" + (currentSlide === 0 ? " slick-disabled" : "")
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
        "slick-next slick-arrow" +
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
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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
