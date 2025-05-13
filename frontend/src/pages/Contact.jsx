import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const Contact = () => {
  return (
    <div className="bg-gradient-to-b from-white via-sky-50 to-white px-4 sm:px-8 md:px-16 lg:px-32 py-12">

      {/* MAP */}
      <div className="overflow-hidden rounded-xl shadow-xl border border-gray-200">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.1635453964693!2d72.57136221533223!3d23.022505984949056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84f2f938b4df%3A0x4f71b0bb0b36a2a6!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1711036400000!5m2!1sen!2sin"
          className="w-full h-[400px] md:h-[480px] border-0"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* TITLE */}
      <div className="text-center text-2xl py-12">
        <Title text1="CONTACT" text2="US" />
        <p className="text-gray-500 text-sm sm:text-base mt-2">
          We'd love to hear from you. Here's how you can reach us.
        </p>
      </div>

      {/* CONTACT INFO */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 mb-24">
        <img
          className="w-full md:max-w-[500px]"
          src={assets.contact_img}
          alt="Contact Illustration"
        />

        <div className="glass-bg p-8 rounded-2xl shadow-xl border backdrop-blur-sm bg-white/60 w-full md:w-2/3 space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">📍 Our Store</h3>
            <p className="text-gray-600 mt-2">
              Dailict College, Reliance Cross Rd,<br /> Ahmedabad, Gujarat
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-800">📞 Contact Info</h3>
            <p className="text-gray-600 mt-2">
              Tel: +91 95379 04484 <br />
              Email: <a href="mailto:admin@zipshop.com" className="text-blue-600 underline">admin@zipshop.com</a>
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-800">💼 Careers at Zipshop</h3>
            <p className="text-gray-600 mt-2">
              Explore roles, teams, and exciting opportunities to grow.
            </p>
            <button className="mt-4 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-all">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>

      {/* NEWSLETTER */}
      <NewsletterBox />
    </div>
  );
};

export default Contact;
