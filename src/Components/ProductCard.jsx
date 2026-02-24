import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useWishlist } from "../context/WishlistContext";
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  // Destructure wishlist state and functions from context
  const { wishlistItems = [], addToWishlist, removeFromWishlist } = useWishlist();

  // Safety check
  if (!product) return null;

  // Handle both MongoDB (_id) and Supabase (id) formats
  const productId = product._id || product.id;

  const baseUrl = 'http://localhost:5000/';
  const productImagePath = product.images?.[0] || product.image;
  const productImage = productImagePath ? `${baseUrl}${productImagePath}` : '/placeholder.jpg';

  const isWishlisted = wishlistItems.some((p) => (p._id || p.id) === productId);

  const handleAddToCart = () => {
    toast.info('Please select size before adding to cart');
    navigate(`/product/${productId}`);
  };

  // Wishlist toggle handler using context functions
  const handleWishlistToggle = (product) => {
    const itemId = product._id || product.id;
    const exists = wishlistItems.find((item) => (item._id || item.id) === itemId);
    if (exists) {
      removeFromWishlist(itemId);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <motion.div 
      className="relative bg-white rounded-xl shadow overflow-hidden border border-transparent group"
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        borderColor: "#ec4899"
      }}
      transition={{ duration: 0.3 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Image + Title wrapped in Link */}
      <Link to={`/product/${productId}`}>
        <div className="overflow-hidden">
          <motion.img
            src={productImage}
            alt={product.name}
            className="w-full h-60 object-cover"
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </Link>

      {/* Heart Icon */}
      <motion.button
        onClick={() => handleWishlistToggle(product)}
        className="absolute top-3 right-3 text-xl text-pink-500 bg-white rounded-full p-2 shadow-md z-10"
        whileHover={{ 
          scale: 1.2,
          rotate: [0, -10, 10, -10, 0],
          backgroundColor: "#fce7f3"
        }}
        whileTap={{ scale: 0.9 }}
        animate={isWishlisted ? {
          scale: [1, 1.2, 1],
        } : {}}
        transition={{ 
          scale: { duration: 0.3 },
          rotate: { duration: 0.5 }
        }}
      >
        <motion.div
          animate={isWishlisted ? {
            scale: [1, 1.3, 1],
            color: ["#ec4899", "#be185d", "#ec4899"]
          } : {}}
          transition={{ duration: 0.5 }}
        >
          {isWishlisted ? <FaHeart /> : <FaRegHeart />}
        </motion.div>
      </motion.button>

      <motion.div 
        className="p-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Link to={`/product/${productId}`}>
          <motion.h3 
            className="text-md font-semibold text-gray-800"
            whileHover={{ color: "#ec4899", scale: 1.05 }}
          >
            {product.name}
          </motion.h3>
        </Link>
        <motion.p 
          className="text-green-700 font-bold text-lg mt-2"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.mark 
            className="bg-yellow-200 rounded px-1"
            whileHover={{ 
              backgroundColor: "#fef08a",
              scale: 1.1
            }}
          >
            ₹{product.price}
          </motion.mark>
        </motion.p>
        
        <motion.button
          onClick={handleAddToCart}
          className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-pink-600 text-white text-sm rounded-full"
          whileHover={{ 
            backgroundColor: "#be185d",
            scale: 1.05,
            boxShadow: "0 10px 15px -3px rgba(236, 72, 153, 0.5)"
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div
            animate={{ 
              rotate: [0, -10, 10, 0]
            }}
            transition={{ 
              duration: 0.5,
              repeat: Infinity,
              repeatDelay: 3
            }}
          >
            <FaShoppingCart />
          </motion.div>
          Add to Cart
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ProductCard;
