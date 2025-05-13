import React from 'react';
import { assets } from '../assets/assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { BsLinkedin, BsGithub, BsYoutube, BsInstagram } from "react-icons/bs";
import { FaCcVisa, FaCcMastercard } from "react-icons/fa";
import { SiCashapp, SiGooglepay } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-gray-700 pt-10 pb-6 px-4 sm:px-10 lg:px-20 transition-all duration-300">
      {/* Top Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
        
        {/* Logo + Description */}
        <div>
          <img className="mb-4 w-32 sm:w-36" src={assets.logo} alt="Logo" />
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed text-justify">
            Welcome to <strong>ZipShop</strong> – your go-to destination for trendy and quality products. Shop smart with unbeatable prices and seamless experience.
          </p>
          <div className="flex gap-3 mt-5">
            <FaCcVisa className="text-2xl sm:text-3xl text-blue-600" />
            <FaCcMastercard className="text-2xl sm:text-3xl text-red-600" />
            <SiCashapp className="text-2xl sm:text-3xl text-green-500" />
            <SiGooglepay className="text-2xl sm:text-3xl text-[#4285F4]" />
          </div>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">Company</h3>
          <ul className="space-y-2 text-sm sm:text-base">
            <li className="hover:text-black cursor-pointer transition duration-200">Home</li>
            <li className="hover:text-black cursor-pointer transition duration-200">About Us</li>
            <li className="hover:text-black cursor-pointer transition duration-200">Delivery</li>
            <li className="hover:text-black cursor-pointer transition duration-200">Privacy Policy</li>
          </ul>
        </div>

        {/* Info Links */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">Information</h3>
          <ul className="space-y-2 text-sm sm:text-base">
            <li className="hover:text-black cursor-pointer transition duration-200">Refund Policy</li>
            <li className="hover:text-black cursor-pointer transition duration-200">Shipping Policy</li>
            <li className="hover:text-black cursor-pointer transition duration-200">Terms & Conditions</li>
            <li className="hover:text-black cursor-pointer transition duration-200">Privacy Policy</li>
          </ul>
        </div>

        {/* Contact + Social */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">Get in Touch</h3>
          <address className="not-italic text-sm sm:text-base leading-relaxed text-gray-600 space-y-1">
  <p>Dailict College, Reliance Cross Rd,</p>
  <p>Ahmedabad, Gujarat, 382007</p>
  <p>+91 9537904484</p>
  <p>contact@zipshop.com</p>
</address>

          <div className="flex gap-4 mt-4">
            <a className="hover:scale-110 transition duration-200 text-blue-600" href="#"><BsLinkedin className="text-xl sm:text-2xl" /></a>
            <a className="hover:scale-110 transition duration-200 text-pink-600" href="#"><BsInstagram className="text-xl sm:text-2xl" /></a>
            <a className="hover:scale-110 transition duration-200 text-gray-800" href="#"><BsGithub className="text-xl sm:text-2xl" /></a>
            <a className="hover:scale-110 transition duration-200 text-red-500" href="#"><BsYoutube className="text-xl sm:text-2xl" /></a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-6 border-gray-300" />

      {/* Bottom Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center text-sm sm:text-base gap-3">
        <a href="#top" className="flex items-center gap-2 text-gray-700 hover:text-black border border-gray-400 px-4 py-2 rounded-lg transition hover:shadow-md">
          <FontAwesomeIcon icon={faChevronUp} className="text-sm" />
          Back to Top
        </a>
        <p className="text-gray-600 text-center">&copy; Copyright 2024 zipshop.com – All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
