import mongoose from "mongoose";

const { Schema } = mongoose;

const watchlistSchema = new Schema({
  id: { type: Number },
  title: { type: String },
  image: { type: String },
  // director: { type: String, required: true },
  // genres: { type: String, required: true },
  synopsis: { type: String },
  streaming: { type: String },
  isFavorite: { type: Boolean },
});

const WatchlistMovie =
  mongoose.models.watchlist || mongoose.model("watchlist", watchlistSchema);

export default WatchlistMovie;
