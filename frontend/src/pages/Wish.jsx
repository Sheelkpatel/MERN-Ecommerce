import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Wishlist = () => {
    const { wishlistData, setWishlistData, backendUrl,user, getUserWishlist } = useContext(ShopContext);
    const [filteredWishlist, setFilteredWishlist] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sortType, setSortType] = useState("relevant");
    const [showFilter, setShowFilter] = useState(false);

    useEffect(() => {
        getUserWishlist();
      }, []);

    useEffect(() => {
        applyFilterAndSort();
    }, [wishlistData, category, subCategory, sortType]);

    

    const toggleCategory = (e) => {
        const value = e.target.value;
        setCategory((prev) =>
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
    };

    const toggleSubCategory = (e) => {
        const value = e.target.value;
        setSubCategory((prev) =>
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
    };

    const applyFilterAndSort = () => {
        let filtered = [...wishlistData];

        if (category.length)
            filtered = filtered.filter((item) => category.includes(item.category));
        if (subCategory.length)
            filtered = filtered.filter((item) => subCategory.includes(item.subCategory));

        sortWishlist(filtered);
    };

    const sortWishlist = (items) => {
        let sorted = [...items];
        if (sortType === "low-high") {
            sorted.sort((a, b) => a.price - b.price);
        } else if (sortType === "high-low") {
            sorted.sort((a, b) => b.price - a.price);
        }
        setFilteredWishlist(sorted);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
        >
            {/* Mobile filter toggle */}
            <div className="sm:hidden p-4 flex justify-between items-center bg-white shadow-md sticky top-0 z-20">
                <Title text1="MY" text2="WISHLIST" />
                <button
                    onClick={() => setShowFilter(true)}
                    className="text-sm px-3 py-1 bg-black text-white rounded"
                >
                    Filters
                </button>
            </div>

            {/* Mobile filter drawer */}
            {showFilter && (
                <div className="fixed z-30 top-0 left-0 w-64 h-full bg-white shadow-lg px-6 py-4 transition-transform duration-300 sm:hidden">
                    <button
                        onClick={() => setShowFilter(false)}
                        className="text-right block ml-auto text-red-500 font-semibold text-sm mb-4"
                    >
                        Close ✖
                    </button>
                    <SidebarFilters
                        category={category}
                        subCategory={subCategory}
                        toggleCategory={toggleCategory}
                        toggleSubCategory={toggleSubCategory}
                    />
                </div>
            )}

            <div className="flex flex-col sm:flex-row pt-6 sm:pt-10 mb-20">
                {/* Sidebar */}
                <div className="hidden sm:block min-w-[220px] px-6">
                    <SidebarFilters
                        category={category}
                        subCategory={subCategory}
                        toggleCategory={toggleCategory}
                        toggleSubCategory={toggleSubCategory}
                    />
                </div>

                {/* Wishlist content */}
                <div className="flex-1 px-4 sm:px-10">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl sm:text-3xl font-medium hidden sm:block">My Wishlist</h2>
                        <select
                            onChange={(e) => setSortType(e.target.value)}
                            className="border border-gray-300 text-sm px-3 py-2 rounded-md"
                        >
                            <option value="relevant">Sort by: Relevant</option>
                            <option value="low-high">Price: Low to High</option>
                            <option value="high-low">Price: High to Low</option>
                        </select>
                    </div>

                    {/* Items Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 mb-40">
                        {filteredWishlist.length > 0 ? (
                            filteredWishlist.map((item) => (
                                <ProductItem
                                    key={item._id}
                                    id={item._id}
                                    name={item.name}
                                    price={item.price}
                                    image={
                                        item.image ||
                                        "https://via.placeholder.com/300x400.png?text=No+Image"
                                    }
                                />
                            ))
                        ) : (
                            <p className="text-center text-gray-500 col-span-full">
                                Your wishlist is empty.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const SidebarFilters = ({ category, subCategory, toggleCategory, toggleSubCategory }) => (
    <div>
        <div className="mb-6">
            <p className="text-base font-semibold mb-3">Categories</p>
            <div className="flex flex-col gap-2 text-sm text-gray-700">
                {["Men", "Women", "Kids"].map((cat) => (
                    <label key={cat} className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            className="w-4 h-4"
                            value={cat}
                            onChange={toggleCategory}
                            checked={category.includes(cat)}
                        />
                        {cat}
                    </label>
                ))}
            </div>
        </div>
        <div>
            <p className="text-base font-semibold mb-3">Type</p>
            <div className="flex flex-col gap-2 text-sm text-gray-700">
                {["Topwear", "Bottomwear", "Winterwear"].map((subCat) => (
                    <label key={subCat} className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            className="w-4 h-4"
                            value={subCat}
                            onChange={toggleSubCategory}
                            checked={subCategory.includes(subCat)}
                        />
                        {subCat}
                    </label>
                ))}
            </div>
        </div>
    </div>
);

export default Wishlist;
