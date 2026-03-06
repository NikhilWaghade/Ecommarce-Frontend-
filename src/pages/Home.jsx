import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import API from "../api/api";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

import hero1 from "../assets/hero-image1.jpg";
import hero2 from "../assets/hero-image2.jpg";
import hero3 from "../assets/hero-image3.jpg";

const IMAGE_BASE = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace("/api", "")
  : "http://localhost:5000";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [highPriceProducts, setHighPriceProducts] = useState([]);
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const { addToCart } = useCart();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();

  const heroImages = [
    { id: "hero1", img: hero1 },
    { id: "hero2", img: hero2 },
    { id: "hero3", img: hero3 },
  ];

  // =========================
  // IMAGE HELPER
  // =========================
  const getImage = (img) => {
    if (!img) return "/placeholder.jpg";

    if (img.startsWith("http")) return img;

    return `${IMAGE_BASE}/${img}`;
  };

  // =========================
  // FETCH PRODUCTS
  // =========================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        const allProducts = Array.isArray(res.data) ? res.data : [];

        setProducts(allProducts);

        const top4Expensive = [...allProducts]
          .filter((p) => typeof p.price === "number")
          .sort((a, b) => b.price - a.price)
          .slice(0, 4);

        setHighPriceProducts(top4Expensive);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  // =========================
  // TIMER
  // =========================
  useEffect(() => {
    const targetTime = new Date();
    targetTime.setHours(targetTime.getHours() + 2);

    const timer = setInterval(() => {
      const now = new Date();
      const diff = targetTime - now;

      if (diff > 0) {
        setTimeLeft({
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // =========================
  // CART
  // =========================
  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success("Added to cart!");
  };

  // =========================
  // WISHLIST
  // =========================
  const handleWishlistToggle = (product) => {
    const productId = product._id || product.id;

    const exists = wishlistItems.some(
      (p) => (p._id || p.id) === productId
    );

    if (exists) {
      removeFromWishlist(productId);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist(product);
      toast.success("Added to wishlist");
    }
  };

  // =========================
  // PRODUCT CARD
  // =========================
  const ProductCardUI = ({ product }) => {
    const productId = product._id || product.id;

    const isWishlisted = wishlistItems.some(
      (p) => (p._id || p.id) === productId
    );

    const productImage = getImage(product.images?.[0] || product.image);

    return (
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 relative">

        {/* WISHLIST */}
        <button
          onClick={() => handleWishlistToggle(product)}
          className="absolute top-4 right-4 bg-white p-2 rounded-full shadow"
        >
          <FaHeart
            className={isWishlisted ? "text-pink-600" : "text-gray-400"}
          />
        </button>

        {/* PRODUCT LINK */}
        <Link to={`/product/${productId}`}>

          <div className="w-full h-48 flex items-center justify-center">
            <img
              src={productImage}
              alt={product.name}
              className="max-h-full object-contain"
            />
          </div>

          <h3 className="text-center font-semibold mt-6 text-gray-800">
            {product.name}
          </h3>

          <div className="flex justify-center mt-3">
            <span className="bg-yellow-300 px-4 py-1 rounded-md font-bold text-black">
              ₹{product.price}
            </span>
          </div>

        </Link>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full">

          <button
            onClick={() => handleAddToCart(product)}
            className="w-full bg-black text-white px-6 py-3 rounded-lg font-medium 
            hover:bg-gray-800 transition"
          >
            Add to Cart
          </button>

          <button
            onClick={() => handleWishlistToggle(product)}
            className={`w-full px-6 py-3 rounded-lg border-2 font-medium
            ${
              isWishlisted
                ? "bg-pink-500 text-white border-pink-500"
                : "bg-white text-pink-500 border-pink-500"
            }`}
          >
            {isWishlisted ? "Remove Wishlist" : "Add Wishlist"}
          </button>

        </div>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-r from-green-100 to-blue-200 min-h-screen">

      {/* HERO */}
      <Swiper modules={[Autoplay]} autoplay={{ delay: 3000 }} loop>
        {heroImages.map((item) => (
          <SwiperSlide key={item.id}>
            <img
              src={item.img}
              alt={item.id}
              className="w-full h-[300px] md:h-[450px] object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* LATEST PRODUCTS */}
      <div className="max-w-7xl mx-auto px-4 py-14">
        <h2 className="text-4xl font-bold mb-10">Latest Products</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {products.slice(0, 4).map((product) => (
            <ProductCardUI key={product._id || product.id} product={product} />
          ))}
        </div>
      </div>

      {/* OFFER TIMER */}
      <section className="bg-gradient-to-r from-purple-900 via-indigo-900 to-gray-900 text-white py-20 text-center">
        <h2 className="text-4xl font-bold text-teal-300 mb-8">
          TODAY'S SPECIAL Offer
        </h2>

        <div className="flex justify-center gap-6">
          {["Hours", "Minutes", "Seconds"].map((label, idx) => (
            <div key={label} className="bg-white/10 rounded-xl p-4 w-24">
              <div className="text-2xl font-bold text-lime-300">
                {String(Object.values(timeLeft)[idx]).padStart(2, "0")}
              </div>
              <div className="text-sm mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <div className="max-w-7xl mx-auto px-4 py-14">
        <h2 className="text-4xl font-bold mb-10">Featured Products</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {highPriceProducts.map((product) => (
            <ProductCardUI key={product._id || product.id} product={product} />
          ))}
        </div>
      </div>

    </div>
  );
};

export default Home;