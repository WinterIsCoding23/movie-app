import mongoose from "mongoose";

const { Schema } = mongoose;

const watchlistSchema = new Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  director: { type: String, required: true },
  genres: { type: String, required: true },
  synopsis: { type: String, required: true },
  streaming: { type: String, required: true },
});

const WatchlistMovie =
  mongoose.models.Watchlist || mongoose.model("Watchlist", watchlistSchema);

export default WatchlistMovie;
