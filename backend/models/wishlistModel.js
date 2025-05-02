// models/Wishlist.js
import mongoose from "mongoose";


const WishlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product' }]
});

const wishlistModel = mongoose.model('Wishlist', WishlistSchema);
export default wishlistModel  