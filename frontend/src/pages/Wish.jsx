import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { motion } from "framer-motion";
import axios from "axios"; // Ensure axios is imported for making API requests
import { toast } from "react-toastify"; // Assuming you're using react-toastify for notifications

const Wishlist = () => {
    const { wishlistData, setWishlistData ,backendUrl } = useContext(ShopContext); 
    const [filteredWishlist, setFilteredWishlist] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sortType, setSortType] = useState("relevant");
    const [showFilter, setShowFilter] = useState(false);

    // Fetch wishlist data with tokenization
    useEffect(() => {
        fetchWishlistData();
    }, []);

    // Apply filter and sorting when dependencies change
    useEffect(() => {
        applyFilterAndSort();
    }, [category, subCategory, wishlistData, sortType]);

    const fetchWishlistData = async () => {
        try {
            // Get token from localStorage or other storage
            const token = localStorage.getItem("token");

            // If there's no token, notify the user and return
            if (!token) {
                toast.error("Please log in to view your wishlist.");
                return;
            }

            // Make API request to fetch wishlist with token authorization
            const res = await axios.get(`http://localhost:3000/api/wishlist/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Check if the response is successful
            if (res.data.success) {
                const wishlist = res.data.wishlist;

                // If the wishlist contains objects and the first item has an _id, set the data
                if (wishlist.length > 0) {
                    if (typeof wishlist[0] === "object" && wishlist[0]._id) {
                        setWishlistData(wishlist);
                    } else {
                        setWishlistData([]);
                    }
                }
            } 
        } catch (error) {
            toast.error("Error fetching wishlist");
            console.error(error);
        }
    };

    const toggleCategory = (e) => {
        const value = e.target.value;
        setCategory((prev) => prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]);
    };

    const toggleSubCategory = (e) => {
        const value = e.target.value;
        setSubCategory((prev) => prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]);
    };

    const applyFilterAndSort = () => {
        let wishlistCopy = wishlistData ? [...wishlistData] : [];

        // Apply category filter
        if (category.length > 0) {
            wishlistCopy = wishlistCopy.filter((item) => item.category && category.includes(item.category));
        }

        // Apply subcategory filter
        if (subCategory.length > 0) {
            wishlistCopy = wishlistCopy.filter((item) => item.subCategory && subCategory.includes(item.subCategory));
        }

        sortWishlist(wishlistCopy);
    };

    const sortWishlist = (wishlistCopy) => {
        let sortedWishlist = [...wishlistCopy];

        switch (sortType) {
            case "low-high":
                sortedWishlist.sort((a, b) => a.price - b.price);
                break;
            case "high-low":
                sortedWishlist.sort((a, b) => b.price - a.price);
                break;
            default:
                break; // Keep the default order
        }

        setFilteredWishlist(sortedWishlist);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileInView={{ opacity: 1, y: 0 }}
        >
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10">
                {/* Filter Options */}
                <div className="min-w-60">
                    <p onClick={() => setShowFilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-2">
                        FILTERS
                        <img className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`} src={assets.dropdown_icon} alt="dropdown" />
                    </p>

                    {/* Category Filter */}
                    <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
                        <p className="mb-3 text-sm font-medium">CATEGORIES</p>
                        <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                            {["Men", "Women", "Kids"].map((cat) => (
                                <label key={cat} className="flex gap-2">
                                    <input className="w-3" type="checkbox" value={cat} onChange={toggleCategory} checked={category.includes(cat)} /> {cat}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* SubCategory Filter */}
                    <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? "" : "hidden"} sm:block`}>
                        <p className="mb-3 text-sm font-medium">TYPE</p>
                        <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                            {["Topwear", "Bottomwear", "Winterwear"].map((subCat) => (
                                <label key={subCat} className="flex gap-2">
                                    <input className="w-3" type="checkbox" value={subCat} onChange={toggleSubCategory} checked={subCategory.includes(subCat)} /> {subCat}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side */}
                <div className="flex-1">
                    <div className="flex justify-between text-base sm:text-2xl mb-4">
                        <Title text1="MY" text2="WISHLIST" />

                        {/* Wishlist Sorting */}
                        <select onChange={(e) => setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
                            <option value="relevant">Sort by: Relevant</option>
                            <option value="low-high">Sort by: Low to High</option>
                            <option value="high-low">Sort by: High to Low</option>
                        </select>
                    </div>

                    {/* Wishlist Products */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 mb-2">
                        {filteredWishlist.length > 0 ? (
                            filteredWishlist.map((item) => (
                                <ProductItem
                                    key={item._id}
                                    name={item.name || "Unknown"}
                                    id={item._id}
                                    price={item.price || 0}
                                    image={item.image || "default-image.jpg"}
                                />
                            ))
                        ) : (
                            <p>Your wishlist is empty.</p>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Wishlist;
