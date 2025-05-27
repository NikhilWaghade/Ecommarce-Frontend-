import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useWishlist } from "../context/WishlistContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  // Destructure wishlist state and functions from context
  const { wishlistItems = [], addToWishlist, removeFromWishlist } = useWishlist();

  // Safety check
  if (!product) return null;

  const baseUrl = 'http://localhost:5000/';
  const productImagePath = product.images?.[0] || product.image;
  const productImage = productImagePath ? `${baseUrl}${productImagePath}` : '/placeholder.jpg';

  const isWishlisted = wishlistItems.some((p) => p._id === product._id);

  const handleAddToCart = () => {
    toast.info('Please select size before adding to cart');
    navigate(`/product/${product._id}`);
  };

  // Wishlist toggle handler using context functions
  const handleWishlistToggle = (product) => {
    const exists = wishlistItems.find((item) => item._id === product._id);
    if (exists) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="relative bg-white rounded-xl shadow hover:shadow-lg transition transform hover:scale-105 duration-300 overflow-hidden border border-transparent hover:border-pink-500">
      
      {/* Image + Title wrapped in Link */}
      <Link to={`/product/${product._id}`}>
        <img
          src={productImage}
          alt={product.name}
          className="w-full h-60 object-cover"
        />
      </Link>

      {/* Heart Icon */}
      <button
        onClick={() => handleWishlistToggle(product)}
        className="absolute top-3 right-3 text-xl text-pink-500 bg-white rounded-full p-1 shadow-md hover:scale-110 transition"
      >
        {isWishlisted ? <FaHeart /> : <FaRegHeart />}
      </button>

      <div className="p-4 text-center">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-md font-semibold text-gray-800">{product.name}</h3>
        </Link>
        <p className="text-green-700 font-bold text-lg mt-2">
          <mark className="bg-yellow-200 rounded px-1">₹{product.price}</mark>
        </p>
        
        <button
          onClick={handleAddToCart}
          className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-pink-600 text-white text-sm rounded-full hover:bg-pink-700 transition"
        >
          <FaShoppingCart />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
