import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { toast } from "react-toastify";
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  const handleIncrease = (itemId, size, quantity) => {
    updateQuantity(itemId, size, quantity + 1);
  };

  const handleDecrease = (itemId, size, quantity) => {
    if (quantity > 1) {
      updateQuantity(itemId, size, quantity - 1);
    }
  };

  const handleDelete = (itemId, size) => {
    updateQuantity(itemId, size, 0);
    toast.success("Product removed from cart");
  };

  return (
    <div className='pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      {/* If cart is empty, display message */}
      {cartData.length === 0 ? (
        <div className="text-gray-600 text-lg mt-10 mb-10">
          <p>Your cart is empty.</p>
        </div>
      ) : (
        <>
          <div>
            {cartData.map((item, index) => {
              const productData = products.find((product) => product._id === item._id);

              return (
                <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                  <div className='flex items-start gap-6'>
                    <img className='w-16 sm:w-20' src={productData.image[0]} alt="" />
                    <div>
                      <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                      <div className='flex items-center gap-5 mt-2'>
                        <p>{currency}{productData.price}</p>
                        <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                      </div>
                    </div>
                  </div>

                  {/* Quantity Control */}
                  <div className='flex items-center'>
                    <button
                      onClick={() => handleDecrease(item._id, item.size, item.quantity)}
                      disabled={item.quantity === 1}
                      className='border px-2 py-1 mr-2 disabled:opacity-50'
                    >
                      {item.quantity === 1 ? '' : '-'}
                    </button>

                    <input
                      onChange={(e) => {
                        const value = e.target.value === '' ? 0 : Number(e.target.value);
                        updateQuantity(item._id, item.size, value);
                      }}
                      value={item.quantity}
                      className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 text-center'
                      type="number"
                      min={1}
                      onFocus={(e) => e.target.select()}
                    />

                    <button
                      onClick={() => handleIncrease(item._id, item.size, item.quantity)}
                      className='border px-2 py-1 ml-2'
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Item Button */}
                  <button onClick={() => handleDelete(item._id, item.size)} className='bg-black text-white px-8 py-3 text-sm'>
                    Remove
                  </button>
                </div>
              );
            })}
          </div>

          <div className='flex justify-end my-20'>
            <div className='w-full sm:w-[450px]'>
              <CartTotal />
              <div className='w-full text-end'>
                <button
                  onClick={() => navigate('/place-order')}
                  disabled={cartData.length === 0} // Disable button if cart is empty
                  className={`text-white text-sm my-8 px-8 py-3 ${
                    cartData.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-black'
                  }`}
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
