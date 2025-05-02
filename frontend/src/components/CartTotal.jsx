import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

const CartTotal = () => {

    const {currency,getCartAmount,navigate} = useContext(ShopContext);
    const cartAmount = getCartAmount(); 
    const delivery_fee = cartAmount > 0 ? 100 : 0;
    
    
  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>

      <div className='flex flex-col gap-2 mt-2 text-sm'>
            <div className='flex justify-between'>
                <p>Subtotal</p>
                <p>{currency} {getCartAmount()}</p>
            </div>
            <hr />
            <div className='flex justify-between'>
                <p>Shipping Fee</p>
                <p>{currency} {delivery_fee}</p>
            </div>
            <hr />
            <div className='flex justify-between'>
                <b>Total</b>
                <b>{currency} {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}</b>
            </div>
            
      </div>
    </div>
  )
}

export default CartTotal
