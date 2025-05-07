import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';


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
    <nav className="bg-gradient-to-br from-green-100 via-gray-500 to-white shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        
        {/* Left - Logo */}
        <div className="flex justify-between items-center md:justify-start space-x-2 w-full md:w-auto">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="src\assets\logo.png"
              alt="Logo" 
              className="h-14 w-20 object-cover rounded "
            />
            <span className="text-xl font-bold">E-Shop</span>
          </Link>
        </div>

        {/* Center - Search Bar */}
        {/* <form 
          onSubmit={handleSearchSubmit}
          className="w-full md:flex-grow md:max-w-xl"
        >
          <div className="flex w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search products..."
              className="w-full p-2 rounded-l-md text-black"
            />
            <button
              type="submit"
              className="bg-yellow-500 px-4 rounded-r-md hover:bg-yellow-600"
            >
              Search
            </button>
          </div>
        </form> */}

        {/* Right - Navigation Links */}
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-lg md:text-base w-full md:w-auto ">
          <Link to="/collection" className="hover:text-green-300 text-lg font-bold">
            Collection 
          </Link>
          <Link to="/wishlist" className="hover:text-green-300 text-lg font-bold">
            Wishlist ({wishlist?.length || 0})
          </Link>
          <Link to="/cart" className="hover:text-green-300 text-lg font-bold">
            Cart ({cart?.length || 0})
          </Link>
          <Link to="/login" className="hover:text-green-300 text-lg font-bold">
            Login
          </Link>
          <Link to="/signup" className="hover:text-green-300 text-lg font-bold">
            SignUp
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
