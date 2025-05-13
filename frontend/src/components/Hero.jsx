import React from 'react';
import { assets } from '../assets/assets';
import { Typewriter } from 'react-simple-typewriter';

const Hero = () => {
  return (
    <section className="px-4 sm:px-10 lg:px-24 py-12">
      <div className="flex flex-col-reverse sm:flex-row items-center bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl shadow-lg overflow-hidden border border-gray-200">
        
        {/* Hero Left Side */}
        <div className="w-full sm:w-1/2 flex flex-col items-start justify-center gap-6 p-8 sm:p-12 text-[#333]">
          {/* Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-[2px] bg-[#333]"></div>
            <p className="uppercase tracking-widest text-sm font-semibold text-gray-600">
              Trending Now
            </p>
          </div>

          {/* Typewriter Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-800 leading-snug">
            <Typewriter
              words={['Recent Launches', 'New Arrivals', 'Hot Picks']}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={60}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </h1>

          {/* CTA Button */}
          <div className="group flex items-center gap-3 cursor-pointer">
            <span className="text-base font-medium text-gray-700 group-hover:text-black transition-all duration-300">
              Explore Collection
            </span>
            <span className="w-8 h-[2px] bg-gray-700 group-hover:w-12 transition-all duration-300 ease-in-out"></span>
          </div>
        </div>

        {/* Hero Right Side Image */}
        <div className="w-full sm:w-1/2">
          <img
            src={assets.hero_img1}
            alt="Hero"
            className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105 rounded-tr-2xl sm:rounded-tr-none sm:rounded-r-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
