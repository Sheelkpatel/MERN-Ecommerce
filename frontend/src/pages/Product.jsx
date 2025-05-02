import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import { Heart } from 'lucide-react';
import { toast } from "react-toastify";
const Product = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [reviews, setReviews] = useState([
    "Great product! Highly recommend.",
    "Decent quality, but shipping took a while.",
  ]);
  const [newReview, setNewReview] = useState("");

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (newReview.trim() !== "") {
      setReviews([...reviews, newReview]);
      setNewReview("");
    }
  };

  const token = localStorage.getItem("token");
  const { productId } = useParams();
  const { addToWishlist, wishlistItems, removeFromWishlist, products, currency, addToCart } = useContext(ShopContext);
  const isInWishlist = wishlistItems.includes(productId);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  
  const setWishlistItems = async () => {
    if (!token) {
      toast.warning("Please log in to add items to wishlist.");
      return;
    }
    if (isInWishlist) {
      await removeFromWishlist(productId);
      
    } else {
      await addToWishlist(productId);
     
    }
  };

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className='pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/* Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row relative'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item, index) => (
                <img onClick={() => setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%] relative'>
            <img className='w-full h-auto' src={image} alt="" />
            <button
              onClick={setWishlistItems}
              className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md"
            >
              <Heart
                className={`w-6 h-6 ${
                  isInWishlist ? "text-pink-500 fill-pink-500 stroke-pink-500" : "text-gray-600"
                } hover:text-pink-500`}
              />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className=' flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className='inline-flex'>
          <button
  onClick={() => {
    if (!token) {
      toast.warning("Please log in to add items to cart.");
      return;
    }
    if (!size) {
      toast.error("Please select a size.");
      return;
    }
    addToCart(productData._id, size);
    
  }}
  className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'
>
  ADD TO CART
</button>
          </div>
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description & Review Section */}
      <div className="mt-20">
        {/* Tabs */}
        <div className="flex border-b">
          <button
            className={`px-5 py-3 text-sm ${
              activeTab === "description" ? "border-b-2 border-black font-bold" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            className={`px-5 py-3 text-sm ${
              activeTab === "reviews" ? "border-b-2 border-black font-bold" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews ({reviews.length})
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          {activeTab === "description" ? (
            <>
              <p>
                An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence.
              </p>
              <p>
                E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors).
              </p>
            </>
          ) : (
            <>
              <div className="mb-4">
                <h3 className="font-semibold">Post Your Review</h3>
                <form onSubmit={handleReviewSubmit} className="flex flex-col gap-2">
                  <textarea
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    rows="4"
                    className="border p-2 rounded-lg w-full text-sm"
                    placeholder="Write your review here..."
                  ></textarea>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-2"
                  >
                    Submit Review
                  </button>
                </form>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Customer Reviews</h4>
                {reviews.length > 0 ? (
                  reviews.map((review, index) => (
                    <p key={index} className="border-b py-2 text-sm text-gray-600">
                      {review}
                    </p>
                  ))
                ) : (
                  <p>No reviews yet. Be the first to review this product! ⭐</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : <div className='opacity-0'></div>;
};

export default Product;
