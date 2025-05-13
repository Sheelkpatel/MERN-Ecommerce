import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {
  const { backendUrl, token, currency, delivery_fee } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }

      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } });
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            item['orderId'] = order._id;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="pt-16 px-4 sm:px-8 bg-gray-50">
      <div className="text-2xl sm:text-3xl font-semibold text-gray-800">
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div className="mt-8 space-y-6 mb-8">
        {orderData.map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="flex items-center gap-6 sm:w-3/4">
                <img className="w-16 sm:w-24 object-cover rounded-md" src={item.image[0]} alt={item.name} />
                <div>
                  <p className="text-lg font-medium text-gray-800">{item.name}</p>
                  <div className="flex items-center gap-3 mt-1 text-gray-600">
                    <p className="font-semibold text-xl">{currency}{item.price + delivery_fee}</p>
                    <p className="text-sm">Quantity: {item.quantity}</p>
                    <p className="text-sm">Size: {item.size}</p>
                  </div>
                  <p className="mt-1 text-sm text-gray-400">Date: <span className="text-gray-600">{new Date(item.date).toDateString()}</span></p>
                  <p className="mt-1 text-sm text-gray-400">Payment: <span className="text-gray-600">{item.paymentMethod}</span></p>
                </div>
              </div>

              <div className="sm:w-1/3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  <p className="text-sm sm:text-base font-medium text-gray-700">{item.status}</p>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => cancelOrder(item.orderId)}
                    className="px-4 py-2 text-sm font-medium rounded-sm bg-red-500 text-white hover:bg-red-600 transition-colors"
                  >
                    Cancel Order
                  </button>
                  <button
                    onClick={loadOrderData}
                    className="px-4 py-2 text-sm font-medium rounded-sm border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Track Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
