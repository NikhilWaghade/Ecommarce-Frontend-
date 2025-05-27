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
  const { wishlist } = useWishlist();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md w-full sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left - Logo & Brand */}
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

        {/* Toggle Button (Mobile) */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-2xl focus:outline-none">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Center - Nav Links */}
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

        {/* Right - Wishlist & Cart */}
        <div className="hidden md:flex items-center gap-4 text-lg">
          <Link to="/wishlist" className="hover:text-pink-600 font-bold flex items-center gap-1">
            <FaHeart className="text-pink-600" /> Wishlist ({wishlist?.length || 0})
          </Link>
          <Link to="/cart" className="hover:text-green-300 font-bold flex items-center gap-1">
            <FaShoppingCart className="text-pink-600" /> Cart ({cart?.length || 0})
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
          <Link to="/wishlist" onClick={toggleMenu} className="block font-bold flex items-center gap-1">
            <FaHeart className="text-pink-600" /> Wishlist ({wishlist?.length || 0})
          </Link>
          <Link to="/cart" onClick={toggleMenu} className="block font-bold flex items-center gap-1">
            <FaShoppingCart className="text-pink-600" /> Cart ({cart?.length || 0})
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
