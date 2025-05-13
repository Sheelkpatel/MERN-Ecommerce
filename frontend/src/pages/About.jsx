import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="px-4 sm:px-8 md:px-12 lg:px-24 py-10">
      {/* Page Title */}
      <div className="text-3xl text-center font-semibold text-gray-800 pt-6">
        <Title text1="ABOUT" text2="US" />
      </div>

      {/* About Section */}
      <div className="my-12 flex flex-col md:flex-row items-center gap-12">
        <img
          className="w-full md:max-w-[450px] rounded-lg shadow-md"
          src={assets.about}
          alt="About Us"
        />
        <div className="flex flex-col gap-6 md:w-2/3 text-gray-700 text-sm sm:text-base">
          <p>
            <strong className="text-gray-800">Zipshop</strong> was born out of a passion for innovation and a desire to
            revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where
            customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.
          </p>
          <p>
            Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater
            to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an
            extensive collection sourced from trusted brands and suppliers.
          </p>
          <h3 className="text-lg font-semibold text-gray-800">Our Mission</h3>
          <p>
            Our mission at Zipshop is to empower customers with choice, convenience, and confidence. We're dedicated to
            providing a seamless shopping experience that exceeds expectations — from browsing and ordering to delivery and
            beyond.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="text-2xl text-center font-semibold text-gray-800 py-6">
        <Title text1="WHY" text2="CHOOSE US" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 text-sm sm:text-base">
        <div className="border rounded-lg px-8 py-10 shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white">
          <h4 className="text-lg font-bold mb-3 text-gray-800">Quality Assurance</h4>
          <p className="text-gray-600">
            We meticulously select and vet each product to ensure it meets our stringent quality standards.
          </p>
        </div>
        <div className="border rounded-lg px-8 py-10 shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white">
          <h4 className="text-lg font-bold mb-3 text-gray-800">Convenience</h4>
          <p className="text-gray-600">
            With our user-friendly interface and hassle-free ordering process, shopping has never been easier.
          </p>
        </div>
        <div className="border rounded-lg px-8 py-10 shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white">
          <h4 className="text-lg font-bold mb-3 text-gray-800">Exceptional Customer Service</h4>
          <p className="text-gray-600">
            Our team of dedicated professionals is here to assist you every step of the way, ensuring your satisfaction is our top priority.
          </p>
        </div>
      </div>

     
    </div>
  );
};

export default About;
