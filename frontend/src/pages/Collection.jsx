import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import { motion } from "framer-motion";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(true);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');

  const toggleCategory = (e) => {
    setCategory((prev) =>
      prev.includes(e.target.value)
        ? prev.filter((item) => item !== e.target.value)
        : [...prev, e.target.value]
    );
  };

  const toggleSubCategory = (e) => {
    setSubCategory((prev) =>
      prev.includes(e.target.value)
        ? prev.filter((item) => item !== e.target.value)
        : [...prev, e.target.value]
    );
  };

  const applyFilter = () => {
    let productsCopy = [...products];

    // Apply search filter
    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply category filter
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) => category.includes(item.category));
    }

    // Apply subcategory filter
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) => subCategory.includes(item.subCategory));
    }

    return productsCopy; // Return the filtered products
  };

  const sortProduct = (filteredProducts) => {
    let sortedProducts = [...filteredProducts];
    switch (sortType) {
      case 'low-high':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        break; // Default case for "relevant" is already handled
    }
    setFilterProducts(sortedProducts); // Set the sorted products
  };

  useEffect(() => {
    // Apply filters and then sort products
    const filteredProducts = applyFilter();
    sortProduct(filteredProducts);
  }, [category, subCategory, search, showSearch, products, sortType]); // Dependencies for updates

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setShowFilter(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="px-4 sm:px-10 mt-20 pb-10"
    >
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar Filters */}
        {showFilter && (
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:w-64 w-full lg:block"
          >
            <div className="flex justify-between items-center mb-4">
              <p className="text-xl font-semibold">Filters</p>
              <button
                onClick={() => setShowFilter(false)}
                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-all duration-200"
                title="Toggle Filters"
              >
                <img
                  src={assets.dropdown_icon}
                  alt="Toggle Filters"
                  className="w-5 h-5 transform transition-transform rotate-90"
                />
              </button>
            </div>
            <div className="space-y-6">
              {/* Categories Section */}
              <div className="border border-gray-300 p-6 rounded-xl shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
                <p className="text-base font-semibold mb-4 text-gray-800">Categories</p>
                <div className="flex flex-col gap-3 text-sm text-gray-700">
                  {['Men', 'Women', 'Kids'].map((item) => (
                    <label key={item} className="flex gap-3 items-center cursor-pointer hover:text-gray-800 transition-colors duration-200">
                      <input
                        type="checkbox"
                        value={item}
                        onChange={toggleCategory}
                        className="w-5 h-5 border-gray-300 text-gray-600 rounded-sm hover:ring-2 hover:ring-blue-500 focus:ring-2 focus:ring-blue-500"
                      />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Types Section */}
              <div className="border border-gray-300 p-6 rounded-xl shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
                <p className="text-base font-semibold mb-4 text-gray-800">Types</p>
                <div className="flex flex-col gap-3 text-sm text-gray-700">
                  {['Topwear', 'Bottomwear', 'Winterwear'].map((item) => (
                    <label key={item} className="flex gap-3 items-center cursor-pointer hover:text-gray-800 transition-colors duration-200">
                      <input
                        type="checkbox"
                        value={item}
                        onChange={toggleSubCategory}
                        className="w-5 h-5 border-gray-300 text-gray-600 rounded-sm hover:ring-2 hover:ring-blue-500 focus:ring-2 focus:ring-blue-500"
                      />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Products Section */}
        <div className={`flex-1 transition-all duration-300 ${!showFilter ? 'w-full' : ''}`}>
          <div className="flex justify-between items-center mb-6 gap-4">
            <Title text1="All" text2="Collections" />
            <div className="flex items-center gap-4">
              {/* Show sidebar open icon when hidden */}
              {!showFilter && (
                <button
                  onClick={() => setShowFilter(true)}
                  className="p-3 w-48 bg-gray-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
                  title="Open Filters"
                >
                  <span>FILTER</span>
                  <img
                    src={assets.dropdown_icon}
                    alt="Open Filters"
                    className="w-5 h-5 transform transition-transform -rotate-90"
                  />
                </button>
              )}
              <select
                onChange={(e) => setSortType(e.target.value)}
                className="border border-gray-300 px-4 py-2 rounded-md text-sm focus:outline-none"
              >
                <option value="relavent">Sort by: Relevant</option>
                <option value="low-high">Sort by: Low to High</option>
                <option value="high-low">Sort by: High to Low</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-5">
            {filterProducts.map((item, index) => (
              <ProductItem
                key={index}
                name={item.name}
                id={item._id}
                price={item.price}
                image={item.image}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Collection;
