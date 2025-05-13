import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = () => {
  const { currency, getCartAmount, navigate } = useContext(ShopContext);
  const cartAmount = getCartAmount();
  const delivery_fee = cartAmount > 0 ? 100 : 0;
  const total = cartAmount === 0 ? 0 : cartAmount + delivery_fee;

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      {/* Title */}
      <div className="text-center mb-6">
        <Title text1="CART" text2="TOTALS" />
      </div>

      {/* Cart Summary */}
      <div className="space-y-4 text-gray-700 text-sm sm:text-base">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>
            {currency} {cartAmount}
          </span>
        </div>

        <div className="border-t border-gray-200"></div>

        <div className="flex justify-between">
          <span>Shipping Fee</span>
          <span>
            {currency} {delivery_fee}
          </span>
        </div>

        <div className="border-t border-gray-200"></div>

        <div className="flex justify-between font-semibold text-base">
          <span>Total</span>
          <span>
            {currency} {total}
          </span>
        </div>
      </div>

      {/* Checkout Button */}
      
    </div>
  );
};

export default CartTotal;
