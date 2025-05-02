import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>
      
      <div className="flex justify-center items-center w-full py-6">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.1635453964693!2d72.57136221533223!3d23.022505984949056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84f2f938b4df%3A0x4f71b0bb0b36a2a6!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1711036400000!5m2!1sen!2sin"
    className="w-full h-[450px] border-0 shadow-lg rounded-lg"
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</div>

      <div className='text-center text-2xl pt-10 '>
          <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className=' text-gray-500'>Hno:Dailict college,Reliance Cross Rd,<br /> Ahemadabad,Gujarat</p>
          <p className=' text-gray-500'>Tel: +919537904484 <br /> Email: admin@zipshop.com</p>
          <p className='font-semibold text-xl text-gray-600'>Careers at Zipshop</p>
          <p className=' text-gray-500'>Learn more about our teams and job openings.</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>
      </div>

      <NewsletterBox/>
    </div>
  )
}

export default Contact
