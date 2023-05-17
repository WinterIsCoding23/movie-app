"use client";

import Image from "next/image";
import NavBar from "../navbar/NavBar";

export default function DetailPage({ params }) {
  console.log("params ", params);

  const movie = response.results.find((element) => element.params === params);
  console.log("movie: ", movie);

  return (
    <>
      <div>Detail Page</div>
      <h2>{movie.title}</h2>
      <Image src={movie.poster_path} />
      <p>{movie.overview}</p>
      <NavBar />
    </>
  );
}
