import mongoose from "mongoose";

const { Schema } = mongoose;

const watchlistSchema = new Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  // director: { type: String, required: true },
  // genres: { type: String, required: true },
  synopsis: { type: String, required: true },
  streaming: { type: String, required: true },
  isFavorite: { type: Boolean, required: true },
});

const WatchlistMovie =
  mongoose.models.watchlist || mongoose.model("watchlist", watchlistSchema);

export default WatchlistMovie;
