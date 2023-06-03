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
    dots: false,
    infinite: true,
    slidesToShow: calculateSlidesToShow(),
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "60px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: calculateSlidesToShow(1024),
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: calculateSlidesToShow(768),
        },
      },
    ],
    customPaging: function (i) {
      return (
        <div className={styles.customDot}>
          <Image
            src={moviesOnWatchlist[i].image}
            width={50}
            height={50}
            alt={moviesOnWatchlist[i].title}
          />
        </div>
      );
    },
    appendDots: (dots) => <ul className={styles.dotList}>{dots}</ul>,
    beforeChange: function (currentSlide, nextSlide) {
      const slideList = document.querySelectorAll(".slick-slide");

      slideList.forEach((slide, index) => {
        if (index === currentSlide || index === nextSlide) {
          slide.style.filter = "none";
        } else {
          slide.style.filter = "blur(2px)";
        }
      });
    },
  };

  function calculateSlidesToShow(breakpointWidth = Infinity) {
    const viewportWidth = Math.min(window.innerWidth, breakpointWidth);
    const slideWidth = 300; // Adjust this value to your desired slide width
    const margin = 20; // Adjust this value to your desired slide margin

    return Math.floor(viewportWidth / (slideWidth + margin));
  }

  return (
    <div className={styles.watchlistContainer}>
      <h2 className={styles.watchlistHeader}>My Watchlist</h2>
      <Slider {...settings}>
        {moviesOnWatchlist.map((movieOnWatchlist, index) => (
          <div key={index} className={styles.slide}>
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
      <style jsx>{`
        .slick-next {
          right: 10px; /* Adjust the position as needed */
          top: 50%;
          transform: translateY(-50%);
          z-index: 1;
        }
      `}</style>
    </div>
  );
}

// {Object.values(moviesOnWatchlist).forEach(
//   (movieOnWatchlist) => (
//     <li key={movieOnWatchlist.id}>{movieOnWatchlist.isFavorite}</li>
//   )
//   console.log("movieOnWatchlist: ", movieOnWatchlist)
