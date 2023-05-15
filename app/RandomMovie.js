export default function RandomMovie({ response }) {
  function getRandomMovie(response) {
    const randomNumber = Math.floor(Math.random() * response.length);
    return response[randomNumber];
  }
  const randomMovie = getRandomMovie(response);
  console.log("randomMovie: ", randomMovie);

  return (
    <div>
      <h1>Random Movie</h1>
    </div>
  );
}
