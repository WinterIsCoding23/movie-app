import Image from "next/image";

export default function Movie({ title, id, poster_path }) {
  const imagePath = "https://image.tmdb.org/t/p/original";
  
  return (
    <div>
      <h2>{title}</h2>
      <Image
        src={imagePath + poster_path}
        width={400}
        height={400}
        alt={title}
      />
    </div>
  );
}
