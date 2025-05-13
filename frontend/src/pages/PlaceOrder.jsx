import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', street: '', city: '',
    state: '', zipcode: '', country: '', phone: ''
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData(data => ({ ...data, [name]: value }));
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay', response, { headers: { token } });
          if (data.success) {
            setCartItems({});
            navigate('/orders');
          }
        } catch (error) {
          console.log(error);
          toast.error("Payment verification failed");
        }
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];

      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          const quantity = cartItems[productId][size];
          if (quantity > 0) {
            const product = products.find(p => p._id === productId);
            if (product) {
              orderItems.push({ ...structuredClone(product), size, quantity });
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      };

      if (method === 'cod') {
        const res = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } });
        if (res.data.success) {
          setCartItems({});
          navigate('/orders');
        } else {
          toast.error(res.data.message);
        }
      } else if (method === 'razorpay') {
        const res = await axios.post(backendUrl + '/api/order/razorpay', orderData, { headers: { token } });
        if (res.data.success) {
          initPay(res.data.order);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Failed to place order");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col lg:flex-row gap-10 pt-10 px-6 sm:px-12 min-h-[80vh] bg-gray-100 border-t-4 border-gray-300 rounded-lg shadow-md">

      {/* Left Side - Address Form */}
      <div className="w-full lg:max-w-[500px] bg-white p-6 rounded-lg shadow-lg">
        <Title text1="DELIVERY" text2="INFORMATION" />
        <div className="flex gap-4 mt-5">
          <input required name="firstName" value={formData.firstName} onChange={onChangeHandler} className="input-style w-full" placeholder="First Name" />
          <input required name="lastName" value={formData.lastName} onChange={onChangeHandler} className="input-style w-full" placeholder="Last Name" />
        </div>
        <input required name="email" value={formData.email} onChange={onChangeHandler} className="input-style mt-4 w-full" placeholder="Email" />
        <input required name="street" value={formData.street} onChange={onChangeHandler} className="input-style mt-4 w-full" placeholder="Street Address" />
        <div className="flex gap-4 mt-4">
          <input required name="city" value={formData.city} onChange={onChangeHandler} className="input-style w-full" placeholder="City" />
          <input name="state" value={formData.state} onChange={onChangeHandler} className="input-style w-full" placeholder="State" />
        </div>
        <div className="flex gap-4 mt-4">
          <input required type="number" name="zipcode" value={formData.zipcode} onChange={onChangeHandler} className="input-style w-full" placeholder="Zipcode" />
          <input required name="country" value={formData.country} onChange={onChangeHandler} className="input-style w-full" placeholder="Country" />
        </div>
        <input required type="number" name="phone" value={formData.phone} onChange={onChangeHandler} className="input-style mt-4 w-full" placeholder="Phone Number" />
      </div>

      {/* Right Side - Payment and Total */}
      <div className="flex-1 bg-white p-8 rounded-lg shadow-lg">
        <CartTotal />

        <div className="mt-12">
          <Title text1="PAYMENT" text2="METHOD" />
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            {/* Razorpay Option */}
            <div onClick={() => setMethod('razorpay')} className={`payment-option ${method === 'razorpay' ? 'border-green-500 bg-green-50' : ''} p-4 rounded-md cursor-pointer transition-all duration-200 hover:bg-gray-100 flex items-center gap-3`}>
              <div className={`radio-dot ${method === 'razorpay' ? 'bg-green-500' : ''}`} />
              <img src={assets.razorpay_logo} alt="Razorpay" className="h-5 ml-3" />
            </div>
            {/* COD Option */}
            <div onClick={() => setMethod('cod')} className={`payment-option ${method === 'cod' ? 'border-green-500 bg-green-50' : ''} p-4 rounded-md cursor-pointer transition-all duration-200 hover:bg-gray-100 flex items-center gap-3`}>
              <div className={`radio-dot ${method === 'cod' ? 'bg-green-500' : ''}`} />
              <span className="ml-3 text-gray-700 font-medium">Cash on Delivery</span>
            </div>
          </div>

          <div className="text-end mt-10">
            <button type="submit" className="bg-black hover:bg-gray-800 text-white text-sm px-10 py-3 rounded-lg shadow-md transition-all duration-200">
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
