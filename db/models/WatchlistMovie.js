import mongoose from "mongoose";

const { Schema } = mongoose;

const watchlistSchema = new Schema({
  id: { type: Number },
  title: { type: String },
  image: { type: String },
  synopsis: { type: String },
  streamingSources: { type: Array },
  isFavorite: { type: Boolean },
});

const WatchlistMovie =
  mongoose.models.watchlist || mongoose.model("watchlist", watchlistSchema);

export default WatchlistMovie;
