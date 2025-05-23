import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { FaHeart, FaShoppingCart, FaThLarge } from 'react-icons/fa';

const Navbar = () => {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => setSearchQuery(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery.trim()}`);
    }
  };

  return (
    <nav className="bg-[#046169] text-white w-full">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        
        {/* Left - Logo */}
        <div className="flex justify-between items-center md:justify-start space-x-2 w-full md:w-auto">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="src/assets/logo.png"
              alt="Logo" 
              className="h-14 w-20 object-cover rounded"
            />
            <span className="text-xl font-bold">E-Shop</span>
          </Link>
        </div>

        {/* Right - Navigation Links */}
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-lg md:text-base w-full md:w-auto">
          <Link to="/collection" className="hover:text-green-300 text-lg font-bold flex items-center gap-1">
            <FaThLarge className="text-white" /> Collection
          </Link>

          <Link to="/wishlist" className="hover:text-green-300 text-lg font-bold flex items-center gap-1">
            <FaHeart className="text-pink-300" /> Wishlist ({wishlist?.length || 0})
          </Link>

          <Link to="/cart" className="hover:text-green-300 text-lg font-bold flex items-center gap-1">
            <FaShoppingCart className="text-yellow-300" /> Cart ({cart?.length || 0})
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
