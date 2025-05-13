import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import { Heart } from 'lucide-react';
import { toast } from "react-toastify";

const Product = () => {
  const [activeTab, setActiveTab] = useState("description");
  const token = localStorage.getItem("token");
  const { productId } = useParams();
  const { addToWishlist, wishlistItems, removeFromWishlist, products, currency, addToCart,backendUrl } = useContext(ShopContext);
  const isInWishlist = wishlistItems.includes(productId);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [reviews, setReviews] = useState([]);
const [newReview, setNewReview] = useState("");
  
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!token) return toast.warning("Please log in to submit a review.");
    if (!newReview.trim()) return;
  
    try {
      const res = await fetch(`${backendUrl}/api/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, review: newReview }),
       
      });
      const data = await res.json();
      console.log(data)
      setReviews(prev => [...prev, `${"You"}: ${newReview}`]); // or update from response
      setNewReview("");
      toast.success("Review submitted.");
    } catch (err) {
      toast.error("Failed to submit review.");
      console.error(err);
    }
  };

  



  const setWishlistItems = async () => {
    if (!token) return toast.warning("Please log in to add items to wishlist.");
    isInWishlist ? await removeFromWishlist(productId) : await addToWishlist(productId);
  };

  const fetchProductData = () => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    }
  };
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/review/${productId}`);
        const data = await res.json();
        setReviews(data.map(r => `${r.userId.name}: ${r.review}`)); // Customize formatting as needed
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      }
    };
    fetchReviews();
  }, [productId]);
  
  
  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  

  return productData ? (
    <div className='pt-10 px-4 sm:px-10 transition-opacity duration-500'>
      {/* Product Section */}
      <div className='flex flex-col lg:flex-row gap-12'>

        {/* Images */}
        <div className='flex-1 flex flex-col-reverse lg:flex-row gap-4'>
          <div className='flex flex-row lg:flex-col gap-2 max-w-full overflow-x-auto lg:overflow-y-auto lg:max-h-[500px]'>
            {productData.image.map((item, idx) => (
              <img
                key={idx}
                src={item}
                onClick={() => setImage(item)}
                className={`h-24 w-24 object-cover rounded-md border cursor-pointer hover:border-black transition-all duration-300 ${
                  image === item ? "border-black" : "border-gray-200"
                }`}
              />
            ))}
          </div>
          <div className='relative w-full'>
            <img src={image} alt="main product" className='rounded-lg shadow-md w-full max-h-[500px] object-contain' />
            <button
              onClick={setWishlistItems}
              className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:scale-105 transition-transform"
            >
              <Heart
                className={`w-6 h-6 ${
                  isInWishlist ? "text-pink-500 fill-pink-500 stroke-pink-500" : "text-gray-600"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Info */}
        <div className='flex-1'>
          <h1 className='font-semibold text-2xl md:text-3xl mb-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mb-3'>
            {[...Array(4)].map((_, i) => (
              <img key={i} src={assets.star_icon} alt="" className="w-4" />
            ))}
            <img src={assets.star_dull_icon} alt="" className="w-4" />
            <span className='ml-2 text-gray-500 text-sm'>(122 reviews)</span>
          </div>

          <p className='text-2xl md:text-3xl font-medium text-black mb-4'>{currency}{productData.price}</p>
          <p className='text-gray-600 mb-6 text-sm md:text-base'>{productData.description}</p>

          {productData.sizes?.length > 0 && (
            <div className='mb-6'>
              <p className='mb-2 font-medium'>Select Size</p>
              <div className='flex gap-2 flex-wrap'>
                {productData.sizes.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSize(item)}
                    className={`border px-4 py-2 rounded-md transition text-sm ${
                      item === size ? "border-orange-500 bg-orange-100" : "border-gray-300"
                    } hover:border-orange-500`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => {
              if (!token) return toast.warning("Please log in to add items to cart.");
              if (!size && productData.sizes?.length > 0) return toast.error("Please select a size.");
              addToCart(productData._id, size);
            }}
            className='bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-full text-sm transition-all duration-300 w-full sm:w-auto'
          >
            ADD TO CART
          </button>

          <hr className='my-8' />
          <ul className='text-gray-500 text-sm space-y-1'>
            <li>✔ 100% Original product</li>
            <li>✔ Cash on delivery available</li>
            <li>✔ Easy return within 7 days</li>
          </ul>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16">
        <div className="flex gap-4 border-b overflow-x-auto">
          {['description', 'reviews'].map((tab) => (
            <button
              key={tab}
              className={`py-3 px-4 text-sm capitalize transition-all whitespace-nowrap ${
                activeTab === tab
                  ? 'border-b-2 border-black font-bold text-black'
                  : 'text-gray-500 hover:text-black'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'reviews' ? `Reviews (${reviews.length})` : tab}
            </button>
          ))}
        </div>

        <div className="p-6 text-sm text-gray-700 bg-white shadow-md rounded-b-lg">
          {activeTab === 'description' ? (
            <>
              <p className='mb-4'>
                An e-commerce website is a virtual storefront that facilitates online shopping experiences. Customers browse, select, and purchase items with ease and convenience.
              </p>
              <p>
                From high-quality product imagery to secure checkout, everything is optimized to deliver a premium online shopping journey.
              </p>
            </>
          ) : (
            <>
              <form onSubmit={handleReviewSubmit} className="mb-6">
                <textarea
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  rows="4"
                  placeholder="Write your review..."
                  className="w-full border p-3 rounded-md mb-2 resize-none"
                ></textarea>
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm">
                  Submit Review
                </button>
              </form>
              <div className='space-y-3'>
                {reviews.map((review, idx) => (
                  <div key={idx} className="border-b py-2">{review}</div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : <div className="text-center py-20 text-gray-500">Loading...</div>;
};

export default Product;
