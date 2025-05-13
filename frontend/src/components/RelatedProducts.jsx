import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = [...products]
        .filter((item) => item.category === category)
        .filter((item) => item.subCategory === subCategory);

      setRelated(productsCopy.slice(0, 5));
    }
  }, [products]);

  return (
    <div className='my-24 px-4 sm:px-10 animate-fade-in'>
      <div className='text-center'>
        <h2 className='text-2xl sm:text-3xl font-semibold mb-2 tracking-wide'>RELATED PRODUCTS</h2>
        <div className="w-24 mx-auto h-1 bg-black rounded-full mb-6"></div>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
        {related.map((item, index) => (
          <div
            key={index}
            className='transform hover:-translate-y-2 transition-all duration-300 hover:shadow-xl bg-white rounded-lg overflow-hidden'
          >
            <ProductItem
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
