// routes/wishlistRoutes.js
import express from 'express'
import {addToWishlist, removeWishlist, getUserWishlist } from '../controllers/wishlistController.js'
const  wishlistRouter = express.Router();
import authUser from '../middleware/auth.js'

// Add to wishlist
wishlistRouter.post('/add',authUser ,addToWishlist);

// Remove from wishlist
wishlistRouter.post('/remove', authUser,removeWishlist )


// Get user wishlist
wishlistRouter.get("/", authUser,getUserWishlist );



export default wishlistRouter ;
