import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { motion, AnimatePresence } from 'framer-motion';
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
import logo from "../assets/logo(final).jpg"

const Navbar = () => {
  const { cart } = useCart();
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <motion.nav 
      className="bg-white shadow-md w-full sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <motion.div 
          className="flex items-center gap-3"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link to="/" className="flex items-center space-x-2">
            <motion.img
              src={logo}
              alt="Logo"
              className="h-14 w-44 object-cover rounded"
              whileHover={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.5 }}
            />
            <motion.span 
              className="text-xl font-bold hover:text-pink-600"
              whileHover={{ scale: 1.1, color: "#db2777" }}
            >
              E-Shop
            </motion.span>
          </Link>
        </motion.div>

        {/* Toggle Button for Mobile */}
        <div className="md:hidden">
          <motion.button 
            onClick={toggleMenu} 
            className="text-2xl focus:outline-none"
            whileTap={{ scale: 0.9 }}
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </motion.button>
        </div>

        {/* Center Links */}
        <motion.div 
          className="hidden md:flex items-center gap-6 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {[
            { to: "/", icon: FaHome, label: "Home" },
            { to: "/about", icon: FaInfoCircle, label: "About" },
            { to: "/collection", icon: FaThLarge, label: "Collection" },
            { to: "/contact", icon: FaPhone, label: "Contact" }
          ].map((link, idx) => (
            <motion.div
              key={link.to}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 * idx }}
            >
              <Link to={link.to} className="font-bold flex items-center gap-1 relative group">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <link.icon className="text-pink-600" />
                </motion.div>
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  className="hover:text-pink-600"
                >
                  {link.label}
                </motion.span>
                <motion.div
                  className="absolute -bottom-1 left-0 h-0.5 bg-pink-600"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Right Side Icons */}
        <motion.div 
          className="hidden md:flex items-center gap-6 text-lg relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link to="/wishlist" className="hover:text-pink-600 font-bold flex items-center gap-1 relative">
            <motion.div
              whileHover={{ scale: 1.2 }}
              animate={{ 
                scale: wishlistItems.length > 0 ? [1, 1.2, 1] : 1 
              }}
              transition={{ 
                scale: { duration: 0.5, repeat: wishlistItems.length > 0 ? Infinity : 0, repeatDelay: 2 }
              }}
            >
              <FaHeart className="text-pink-600" />
            </motion.div>
            <span>Wishlist</span>
            <AnimatePresence>
              {wishlistItems.length > 0 && (
                <motion.span 
                  className="absolute -top-2 -right-4 bg-pink-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{ scale: 1, rotate: 360 }}
                  exit={{ scale: 0, rotate: -360 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  {wishlistItems.length}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
          <Link to="/cart" className="hover:text-pink-600 font-bold flex items-center gap-1 relative">
            <motion.div
              whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
              animate={{ 
                y: cart.length > 0 ? [0, -5, 0] : 0 
              }}
              transition={{ 
                y: { duration: 0.5, repeat: cart.length > 0 ? Infinity : 0, repeatDelay: 2 }
              }}
            >
              <FaShoppingCart className="text-pink-600" />
            </motion.div>
            <span>Cart</span>
            <AnimatePresence>
              {cart.length > 0 && (
                <motion.span 
                  className="absolute -top-2 -right-4 bg-green-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{ scale: 1, rotate: 360 }}
                  exit={{ scale: 0, rotate: -360 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  {cart.length}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="md:hidden px-6 pb-4 space-y-4 text-base bg-white overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {[
              { to: "/", icon: FaHome, label: "Home" },
              { to: "/about", icon: FaInfoCircle, label: "About" },
              { to: "/collection", icon: FaThLarge, label: "Collection" },
              { to: "/contact", icon: FaPhone, label: "Contact" }
            ].map((link, idx) => (
              <motion.div
                key={link.to}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
              >
                <Link 
                  to={link.to} 
                  onClick={toggleMenu} 
                  className="block font-bold flex items-center gap-1"
                >
                  <link.icon className="text-pink-600" /> {link.label}
                </Link>
              </motion.div>
            ))}
            
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <Link to="/wishlist" onClick={toggleMenu} className="block font-bold flex items-center gap-1 relative">
                <FaHeart className="text-pink-600" />
                <span>Wishlist</span>
                {wishlistItems.length > 0 && (
                  <motion.span 
                    className="absolute -top-1 left-20 bg-pink-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    {wishlistItems.length}
                  </motion.span>
                )}
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <Link to="/cart" onClick={toggleMenu} className="block font-bold flex items-center gap-1 relative">
                <FaShoppingCart className="text-pink-600" />
                <span>Cart</span>
                {cart.length > 0 && (
                  <motion.span 
                    className="absolute -top-1 left-20 bg-green-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    {cart.length}
                  </motion.span>
                )}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
