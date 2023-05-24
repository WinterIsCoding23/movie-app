TMDB
image-path:
const imagePath = "https://image.tmdb.org/t/p/original"

To access parameter-queries:
https://api.themoviedb.org/3/movie/popular

Body for now has a margin!! (8px)

color-palette:
https://colorhunt.co/palette/000000282a3a735f32c69749
rgb(0, 0, 0)
rgb(40, 42, 58)
rgb(115, 95, 50)
rgb(198, 151, 73)

https://upmostly.com/next-js/how-to-level-up-your-next-js-app-with-scroll-animations

From SearchForm.js:

// const handleSubmit = async (event) => {
// event.preventDefault();

// const data = {
// title: event.target.title.value,
// director: event.target.director.value,
// cast: event.target.cast.value,
// };

// const JSONdata = JSON.stringify(data);

// const endpoint = "/api/search";

// const options = {
// method: "POST",
// headers: {
// "Content-Type": "application/json",
// },
// body: JSONdata,
// };

// const response = await fetch(endpoint, options);

// const result = await response.json();
// console.log("Is this your movie-search?", result.data);
// console.log("JSONdata", JSONdata);
// };

// const searchedMovies = useSWR("/search-results");

// async function handleSubmit(event) {
// // event.preventDefault();

// const formData = new FormData(event.target);
// const movieSearchData = Object.fromEntries(formData);

// const request = new XMLHttpRequest();
// request.open("POST", "/search-results");
// movieSearchData.append(); // error: Uncaught (in promise) TypeError: movieSearchData.append is not a function
// request.send(movieSearchData);

// const response = await fetch("/search-results", {
// method: "GET",
// // headers: {
// // "Content-Type": "application/json",
// // },
// // body: JSON.stringify(movieData), --> only for POST-request
// });

// if (response.ok) {
// await response.json();
// searchedMovies.mutate();
// event.target.reset();
// } else {
// console.log(response.status);
// }
// }
