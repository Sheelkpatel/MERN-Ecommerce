import React from 'react';
import { assets } from '../assets/assets';

const OurPolicy = () => {
  return (
    <div className="py-20 ">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold text-gray-800">Our Policies</h2>
        <p className="text-gray-500 mt-2">We believe in providing our customers with exceptional service and easy processes.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 px-6 md:px-20">
        {/* Easy Exchange Policy */}
        <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
          <img src={assets.exchange_icon} className="w-16 mb-5" alt="Easy Exchange" />
          <p className="text-lg font-semibold text-gray-800">Easy Exchange Policy</p>
          <p className="text-gray-400 mt-2">We offer hassle-free exchange policy.</p>
        </div>

        {/* 7 Days Return Policy */}
        <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
          <img src={assets.quality_icon} className="w-16 mb-5" alt="Return Policy" />
          <p className="text-lg font-semibold text-gray-800">7 Days Return Policy</p>
          <p className="text-gray-400 mt-2">We provide 7 days free return policy.</p>
        </div>

        {/* Best Customer Support */}
        <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
          <img src={assets.support_img} className="w-16 mb-5" alt="Customer Support" />
          <p className="text-lg font-semibold text-gray-800">Best Customer Support</p>
          <p className="text-gray-400 mt-2">We provide 24/7 customer support.</p>
        </div>
      </div>
    </div>
  );
};

export default OurPolicy;
