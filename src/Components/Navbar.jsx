import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import {
  FaHeart,
  FaHome,
  FaInfoCircle,
  FaPhone,
  FaShoppingCart,
  FaThLarge,
  FaBars,
  FaTimes
} from 'react-icons/fa';

const Navbar = () => {
  const { cart } = useCart();
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md w-full sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="src/assets/logo(final).jpg"
              alt="Logo"
              className="h-14 w-44 object-cover rounded"
            />
            <span className="text-xl font-bold hover:text-pink-600">E-Shop</span>
          </Link>
        </div>

        {/* Toggle Button for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-2xl focus:outline-none">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-6 text-lg">
          <Link to="/" className="hover:text-pink-600 font-bold flex items-center gap-1">
            <FaHome className="text-pink-600" /> Home
          </Link>
          <Link to="/about" className="hover:text-pink-600 font-bold flex items-center gap-1">
            <FaInfoCircle className="text-pink-600" /> About
          </Link>
          <Link to="/collection" className="hover:text-pink-600 font-bold flex items-center gap-1">
            <FaThLarge className="text-pink-600" /> Collection
          </Link>
          <Link to="/contact" className="hover:text-pink-600 font-bold flex items-center gap-1">
            <FaPhone className="text-pink-600" /> Contact
          </Link>
        </div>

        {/* Right Side Icons */}
        <div className="hidden md:flex items-center gap-6 text-lg relative">
          <Link to="/wishlist" className="hover:text-pink-600 font-bold flex items-center gap-1 relative">
            <FaHeart className="text-pink-600" />
            <span>Wishlist</span>
            {wishlistItems.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-pink-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {wishlistItems.length}
              </span>
            )}
          </Link>
          <Link to="/cart" className="hover:text-pink-600 font-bold flex items-center gap-1 relative">
            <FaShoppingCart className="text-pink-600" />
            <span>Cart</span>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-green-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4 space-y-4 text-base">
          <Link to="/" onClick={toggleMenu} className="block font-bold flex items-center gap-1">
            <FaHome className="text-pink-600" /> Home
          </Link>
          <Link to="/about" onClick={toggleMenu} className="block font-bold flex items-center gap-1">
            <FaInfoCircle className="text-pink-600" /> About
          </Link>
          <Link to="/collection" onClick={toggleMenu} className="block font-bold flex items-center gap-1">
            <FaThLarge className="text-pink-600" /> Collection
          </Link>
          <Link to="/contact" onClick={toggleMenu} className="block font-bold flex items-center gap-1">
            <FaPhone className="text-pink-600" /> Contact
          </Link>
          <Link to="/wishlist" onClick={toggleMenu} className="block font-bold flex items-center gap-1 relative">
            <FaHeart className="text-pink-600" />
            <span>Wishlist</span>
            {wishlist.length > 0 && (
              <span className="absolute -top-1 left-20 bg-pink-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link to="/cart" onClick={toggleMenu} className="block font-bold flex items-center gap-1 relative">
            <FaShoppingCart className="text-pink-600" />
            <span>Cart</span>
            {cart.length > 0 && (
              <span className="absolute -top-1 left-20 bg-green-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
