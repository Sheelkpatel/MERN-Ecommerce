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

  const isInWishlist = wishlistItems.includes(id);

  const handleWishlistToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

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
    <div
      className="group bg-white shadow-lg rounded-xl overflow-hidden transition-transform hover:scale-[1.02] duration-300"
      onClick={() => scrollTo(0, 0)}
    >
      <div className="relative">
        {/* Wishlist Icon */}
        <button
          className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow hover:scale-105 transition z-10"
          onClick={handleWishlistToggle}
        >
          <Heart
            className={`w-5 h-5 ${
              isInWishlist
                ? "text-pink-500 fill-pink-500 stroke-pink-500"
                : "text-gray-500"
            }`}
          />
        </button>

        {/* Product Image */}
        <Link to={`/product/${id}`} className="block">
          <div className="overflow-hidden rounded-t-xl">
            <img
              src={image[0]}
              alt={name}
              className="w-full h-60 object-cover transform transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          {/* Product Details */}
          <div className="px-4 py-3 text-center">
            <h2 className="text-base font-semibold text-gray-800 truncate">{name}</h2>
            <p className="mt-1 text-sm font-bold text-gray-700">
              {currency}
              {price}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductItem;
