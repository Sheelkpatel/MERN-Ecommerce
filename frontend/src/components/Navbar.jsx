import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setUser,
    setCartItems,
    setWishlistItems,
    user,
  } = useContext(ShopContext);
  

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    localStorage.removeItem('user');
    setUser(null);
    setCartItems({});
    setWishlistItems([]);
    setWishlistData([]);
  };

  const handleSearchClick = () => {
    setShowSearch(true);
    navigate('/collection');
  };

  return (
    <nav className="flex items-center justify-between px-5 py-4 shadow-md bg-white top-0 left-0 right-0 z-50">
      {/* Logo */}
      <Link to="/">
        <img src={assets.logo1} className="w-32 sm:w-36" alt="Logo" />
      </Link>

      {/* Nav Links (Desktop) */}
      <ul className="hidden lg:flex gap-8 text-sm font-semibold text-gray-700">
        {['/', '/collection', '/about', '/contact'].map((path, i) => (
          <NavLink
            key={i}
            to={path}
            className={({ isActive }) =>
              `hover:text-black transition-colors duration-200 ${
                isActive ? 'text-black border-b-2 border-black' : ''
              }`
            }
          >
            {path === '/' ? 'HOME' : path.slice(1).toUpperCase()}
          </NavLink>
        ))}
      </ul>

      {/* Icons & Profile */}
      <div className="flex items-center gap-5">
        <img
          onClick={handleSearchClick} // Updated to use the handler
          src={assets.search_icon}
          className="w-5 cursor-pointer hover:scale-110 transition-transform"
          alt="Search"
        />
        <Link to="/wishlist">
          <img
            src={assets.wishlist}
            className="w-6 cursor-pointer hover:scale-110 transition-transform"
            alt="Wishlist"
          />
        </Link>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5" alt="Cart" />
          <span className="absolute right-[-5px] bottom-[-5px] w-4 h-4 text-center text-[10px] leading-4 bg-black text-white rounded-full">
            {getCartCount()}
          </span>
        </Link>

        {/* Profile Dropdown */}
        <div className="relative group">
          <img
            onClick={() => {
              if (!token) navigate('/login');
            }}
            src={assets.profile_icon}
            className="w-5 cursor-pointer  transition-transform"
            alt="Profile"
          />
          {token && (
            <div className="hidden group-hover:block absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-50">
              <p
                onClick={() => navigate('/orders')}
                className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              >
                Orders
              </p>
              <p
                onClick={logout}
                className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer text-red-500"
              >
                Logout
              </p>
            </div>
          )}
        </div>

        {/* Welcome Message */}
        <div className="hidden lg:block text-sm text-gray-600">
          Welcome, {user?.name || 'Guest'}!
        </div>

        {/* Hamburger Button (Tablet and Below) */}
        <button
          onClick={() => setVisible(!visible)}
          className="flex flex-col justify-center items-center lg:hidden w-6 h-6 relative"
        >
          <span
            className={`block h-0.5 w-5 bg-black transform transition duration-300 ease-in-out ${
              visible ? 'rotate-45 translate-y-1.5' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-black my-1 transition-opacity duration-300 ${
              visible ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-black transform transition duration-300 ease-in-out ${
              visible ? '-rotate-45 -translate-y-1.5' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile Sidebar (Tablet and Below) */}
      <div
        className={`fixed top-0 right-0 h-full bg-white transition-all duration-300 ease-in-out z-50 shadow-lg ${
          visible ? 'w-100' : 'w-0'
        } overflow-hidden`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-4 p-4 border-b">
            <span
              onClick={() => setVisible(false)}
              className="text-gray-700 font-medium cursor-pointer"
            >
              &larr; Back
            </span>
          </div>
          {['/', '/collection', '/about', '/contact'].map((path, i) => (
            <NavLink
              onClick={() => setVisible(false)}
              key={i}
              to={path}
              className="px-6 py-4 border-b text-gray-700 hover:bg-gray-100"
            >
              {path === '/' ? 'HOME' : path.slice(1).toUpperCase()}
            </NavLink>
          ))}
          {token && (
            <>
              <NavLink
                onClick={() => setVisible(false)}
                to="/orders"
                className="px-6 py-4 border-b text-gray-700 hover:bg-gray-100"
              >
                ORDERS
              </NavLink>
              <button
                onClick={() => {
                  logout();
                  setVisible(false);
                }}
                className="px-6 py-4 text-left text-red-500 hover:bg-red-50"
              >
                LOGOUT
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
