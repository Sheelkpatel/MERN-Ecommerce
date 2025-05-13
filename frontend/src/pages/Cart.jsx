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
    <div className='pt-14 px-4 sm:px-8'>
      <div className='text-2xl mb-6'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      {cartData.length === 0 ? (
        <div className="text-gray-600 text-lg text-center py-20">
          <p>Your cart is empty.</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-6">
            {cartData.map((item, index) => {
              const productData = products.find((product) => product._id === item._id);

              return (
                <div key={index} className='border rounded-md p-4 grid gap-4 sm:grid-cols-3 items-center bg-white shadow-sm'>
                  
                  {/* Product Info */}
                  <div className='flex gap-4 items-start'>
                    <img src={productData.image[0]} alt="" className='w-20 h-20 object-cover rounded-md' />
                    <div>
                      <p className='text-sm sm:text-base font-semibold'>{productData.name}</p>
                      <div className='flex gap-3 mt-2 items-center text-sm'>
                        <span>{currency}{productData.price}</span>
                        <span className='bg-slate-100 px-2 py-0.5 rounded text-xs'>{item.size}</span>
                      </div>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className='flex items-center justify-center sm:justify-start gap-2'>
                    <button
                      onClick={() => handleDecrease(item._id, item.size, item.quantity)}
                      disabled={item.quantity === 1}
                      className='border px-3 py-1 rounded disabled:opacity-40'
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) => {
                        const value = e.target.value === '' ? 0 : Number(e.target.value);
                        updateQuantity(item._id, item.size, value);
                      }}
                      onFocus={(e) => e.target.select()}
                      className='w-12 text-center border px-2 py-1 rounded'
                    />
                    <button
                      onClick={() => handleIncrease(item._id, item.size, item.quantity)}
                      className='border px-3 py-1 rounded'
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <div className='flex justify-center sm:justify-end'>
                    <button
                      onClick={() => handleDelete(item._id, item.size)}
                      className='bg-black text-white px-5 py-2 text-xs sm:text-sm rounded hover:bg-gray-800 transition'
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cart Summary & Checkout */}
          <div className='flex justify-center sm:justify-end my-12'>
            <div className='w-full sm:w-[400px]'>
              <CartTotal />
              <div className='w-full text-end'>
                <button
                  onClick={() => navigate('/place-order')}
                  disabled={cartData.length === 0}
                  className={`text-white w-full py-3 mt-6 rounded-md text-sm ${
                    cartData.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800'
                  } transition`}
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
