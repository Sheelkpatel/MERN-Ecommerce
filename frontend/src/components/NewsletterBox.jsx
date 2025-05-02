import React, { useState } from 'react';
import { toast } from 'react-toastify';

const NewsletterBox = () => {
  const [email, setEmail] = useState('');

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    toast.success('Subscribed successfully!');
    setEmail(''); // Clear the input after success
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center p-6">
      <p className="text-lg sm:text-2xl font-medium text-gray-800">
        Subscribe now & get <span className="text-red-500">20% off</span>
      </p>

      <form
        onSubmit={onSubmitHandler}
        className="flex items-center w-full sm:w-auto border border-gray-300 rounded-lg overflow-hidden"
      >
        <input
          className="w-full sm:w-64 px-4 py-3 text-gray-700 outline-none"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-black text-white text-xs sm:text-sm px-6 py-3 hover:bg-gray-800 transition"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;
