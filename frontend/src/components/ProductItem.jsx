import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { toast } from "react-toastify";

const ProductItem = ({ id, image, name, price }) => {
  const {
    currency,
    addToWishlist,
    removeFromWishlist,
    wishlistItems,
    token,
  } = useContext(ShopContext);

  const isInWishlist = wishlistItems.includes(id); // Check if this item is in the wishlist

  const handleWishlistToggle = async (e) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation(); // Prevent bubbling to Link wrapper

    if (!token) {
      toast.warning("Please log in to use the wishlist.");
      return;
    }

    try {
      if (isInWishlist) {
        await removeFromWishlist(id);
      } else {
        await addToWishlist(id);
      }
    } catch (err) {
      toast.error("Error updating wishlist.");
      console.error(err);
    }
  };

  return (
    <div className="text-gray-700 cursor-pointer" onClick={() => scrollTo(0, 0)}>
      <div className="overflow-hidden relative">
        {/* Wishlist Button */}
        <button
          className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md z-10"
          onClick={handleWishlistToggle}
        >
          <Heart
            className={`w-5 h-5 ${
              isInWishlist
                ? "text-pink-500 fill-pink-500 stroke-pink-500"
                : "text-gray-600"
            } hover:text-pink-500`}
          />
        </button>

        {/* Product Link */}
        <Link to={`/product/${id}`}>
          <img
            className="hover:scale-110 transition ease-in-out w-full"
            src={image[0]}
            alt={name}
          />
          <div className="pt-3 pb-1 text-sm">{name}</div>
          <div className="text-sm font-medium">
            {currency}
            {price}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductItem;
