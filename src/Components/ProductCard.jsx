import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { toast } from "react-toastify";
import { useWishlist } from "../context/WishlistContext";
import { motion } from "framer-motion";

const IMAGE_BASE = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace("/api", "")
  : "http://localhost:5000";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const { wishlistItems = [], addToWishlist, removeFromWishlist } =
    useWishlist();

  if (!product) return null;

  const productId = product._id || product.id;

  const productImagePath = product.images?.[0] || product.image;

  // FIXED IMAGE URL
  const getImage = (img) => {
    if (!img) return "/placeholder.jpg";

    if (img.startsWith("http")) {
      return img;
    }

    return `${IMAGE_BASE}/${img}`;
  };

  const productImage = getImage(productImagePath);

  const isWishlisted = wishlistItems.some(
    (p) => (p._id || p.id) === productId
  );

  const handleAddToCart = () => {
    toast.info("Please select size before adding to cart");
    navigate(`/product/${productId}`);
  };

  const handleWishlistToggle = (product) => {
    const itemId = product._id || product.id;

    const exists = wishlistItems.find(
      (item) => (item._id || item.id) === itemId
    );

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
        boxShadow:
          "0 20px 25px -5px rgba(0,0,0,0.1),0 10px 10px -5px rgba(0,0,0,0.04)",
        borderColor: "#ec4899",
      }}
      transition={{ duration: 0.3 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* IMAGE */}
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

      {/* HEART */}
      <motion.button
        onClick={() => handleWishlistToggle(product)}
        className="absolute top-3 right-3 text-xl text-pink-500 bg-white rounded-full p-2 shadow-md z-10"
        whileHover={{
          scale: 1.2,
          rotate: [0, -10, 10, -10, 0],
          backgroundColor: "#fce7f3",
        }}
        whileTap={{ scale: 0.9 }}
      >
        {isWishlisted ? <FaHeart /> : <FaRegHeart />}
      </motion.button>

      <motion.div
        className="p-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Link to={`/product/${productId}`}>
          <h3 className="text-md font-semibold text-gray-800">
            {product.name}
          </h3>
        </Link>

        <p className="text-green-700 font-bold text-lg mt-2">
          <mark className="bg-yellow-200 rounded px-1">
            ₹{product.price}
          </mark>
        </p>

        <motion.button
          onClick={handleAddToCart}
          className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-pink-600 text-white text-sm rounded-full"
          whileHover={{
            backgroundColor: "#be185d",
            scale: 1.05,
          }}
        >
          <FaShoppingCart />
          Add to Cart
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ProductCard;