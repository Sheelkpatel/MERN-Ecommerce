import React from 'react'
import { assets } from '../assets/assets'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BsLinkedin, BsGithub, BsYoutube, BsInstagram } from "react-icons/bs";
import {faChevronUp} from '@fortawesome/free-solid-svg-icons';
import { FaCcVisa, FaCcMastercard } from "react-icons/fa";
import { SiCashapp, SiGooglepay } from "react-icons/si";
import NewsletterBox from './NewsletterBox';

const Footer = () => {
  return (
    <div>
    
      <div className="bg-gray-200 w-full px-6 md:px-20 py-12 ">
  {/* Top Section */}
  <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr_1fr]  text-sm">
    {/* Logo + Description */}
    <div>
      <img className="mb-5 w-40 " src={assets.logo} alt="Logo" />
      <p className="w-full md:w-2/3 text-gray-600 leading-relaxed">
      Welcome to ZipShop, your one-stop shop for the latest trends and top-quality products. 
      We're committed to providing you with an exceptional shopping experience, offering a wide 
      range of products at unbeatable prices.
      </p>
      <div className="flex items-center gap-8 mt-4">
      {/* Visa */}
      <div className="flex justify-center">
        <FaCcVisa className="text-4xl text-blue-600" />
      </div>

      {/* Mastercard */}
      <div className="flex justify-center">
        <FaCcMastercard className="text-4xl text-red-600" />
      </div>

      {/* Cash */}
      <div className="flex justify-center">
        <SiCashapp className="text-4xl text-green-500" />
      </div>

      {/* Rupay */}
      <div className="flex justify-center">
        <SiGooglepay className="text-5xl text-[#4285F4]" />
      </div>
    </div>
      
    </div>

    {/* Company Links */}
    <div>
      <p className="text-xl font-semibold mb-5 text-gray-800">COMPANY</p>
      <ul className="flex flex-col gap-2 text-gray-600">
        <li className="hover:text-gray-900 cursor-pointer transition-colors">Home</li>
        <li className="hover:text-gray-900 cursor-pointer transition-colors">About us</li>
        <li className="hover:text-gray-900 cursor-pointer transition-colors">Delivery</li>
        <li className="hover:text-gray-900 cursor-pointer transition-colors">Privacy policy</li>
      </ul>
    </div>
    <div>
      <p className="text-xl font-semibold mb-5 text-gray-800">INFORMATION</p>
      <ul className="flex flex-col gap-2 text-gray-600">
        <li className="hover:text-gray-900 cursor-pointer transition-colors">Privacy Policy</li>
        <li className="hover:text-gray-900 cursor-pointer transition-colors">Refund Policy</li>
        <li className="hover:text-gray-900 cursor-pointer transition-colors">Shipping Policy</li>
        <li className="hover:text-gray-900 cursor-pointer transition-colors">Terms & Condition</li>
      </ul>
    </div>

    {/* Get In Touch */}
    <div>
      <p className="text-xl font-semibold mb-5 text-gray-800">GET IN TOUCH</p>
      <ul className="flex flex-col gap-1 text-gray-600">
        <li className="hover:text-gray-900 cursor-pointer transition-colors"><p>Hno:Dailict college,Reliance Cross Rd,</p>
        <p>Ahemadabad,Gujarat</p>
        <p>382007</p>
        </li>
        <li className="hover:text-gray-900 cursor-pointer transition-colors">+91 9537904484</li>
        <li className="hover:text-gray-900 cursor-pointer transition-colors">Contact@zipshop.com</li>
      </ul>
      <div className="flex items-center gap-8 mt-4">
                  <a className=" text-blue-600 hover:text-blue-400" href="#" onClick={(e) => e.preventDefault()}>
                    <BsLinkedin className="text-2xl" />
                  </a>
                  <a className="text-rose-500 hover:text-rose-400" href="#" onClick={(e) => e.preventDefault()}>
                    <BsInstagram className="text-2xl" />
                  </a>
                  <a className="text-gray-800 hover:text-gray-600" href="#" onClick={(e) => e.preventDefault()}>
                    <BsGithub className="text-2xl" />
                  </a>
                  <a className="text-red-500 hover:text-red-400" href="#" onClick={(e) => e.preventDefault()}>
                    <BsYoutube className="text-2xl" />
                  </a>
                </div>
    </div>
    
  </div>

  {/* Divider */}
  <hr className="my-8 border-gray-300" />

  {/* Bottom Section */}
  <div className="flex flex-col md:flex-row items-center justify-between ">
    {/* Back to Top Button */}
    <a 
      id="button" 
      href="#top" 
      className="inline-flex items-center justify-center border border-gray-400 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-lg text-lg transition-all duration-300 shadow-md hover:shadow-lg"
    >
      <FontAwesomeIcon icon={faChevronUp} className="text-black" />
    </a>

    {/* Copyright Text */}
    <p className="text-md text-gray-600 mt-4 md:mt-0">
      &copy; 2024 @ zipshop.com - All Rights Reserved.
    </p>
  </div>
</div>

    </div>
  )
}

export default Footer;


   
