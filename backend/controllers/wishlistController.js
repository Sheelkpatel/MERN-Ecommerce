import Wishlist from '../models/wishlistModel.js';

const addToWishlist = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = new Wishlist({ userId, products: [productId] });
    } else {
      if (!wishlist.products.includes(productId)) {
        wishlist.products.push(productId);
      }
    }

    await wishlist.save();
    res.status(200).json({ success: true, wishlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeWishlist = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found.' });
    }

    wishlist.products = wishlist.products.filter(
      (id) => id?.toString() !== productId
    );

    await wishlist.save();
    res.status(200).json({ success: true, wishlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserWishlist = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming userId from params

    const wishlist = await Wishlist.findOne({ userId }).populate('products');

    if (!wishlist) {
      return res.json({ success: true, wishlist: [] });
    }

    return res.json({ success: true, wishlist: wishlist.products });
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch wishlist' });
  }
};

export { addToWishlist, removeWishlist, getUserWishlist };
