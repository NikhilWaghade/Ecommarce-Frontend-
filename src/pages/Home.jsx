import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import API from "../api/api";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

import hero1 from "../assets/hero-image1.jpg";
import hero2 from "../assets/hero-image2.jpg";
import hero3 from "../assets/hero-image3.jpg";

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
  // OFFER TIMER
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
  // ADD TO CART
  // =========================
  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success("Added to cart!");
  };

  // =========================
  // WISHLIST TOGGLE
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

    return (
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 relative">
        <button
          onClick={() => handleWishlistToggle(product)}
          className="absolute top-4 right-4 bg-white p-2 rounded-full shadow"
        >
          <FaHeart
            className={isWishlisted ? "text-pink-600" : "text-gray-400"}
          />
        </button>

        <div className="w-full h-48 flex items-center justify-center">
          <img
            src={product.image || "/placeholder.jpg"}
            alt={product.name}
            loading="lazy"
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

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full">

          <button
            onClick={() => handleAddToCart(product)}
            className="w-full bg-black text-white px-6 py-3 rounded-lg font-medium 
            hover:bg-gray-800 transition duration-200 shadow-md hover:shadow-lg"
          >
            Add to Cart
          </button>

          <button
            onClick={() => handleWishlistToggle(product)}
            className={`w-full px-6 py-3 rounded-lg border-2 font-medium transition duration-200
            ${
              isWishlisted
                ? "bg-pink-500 text-white border-pink-500 hover:bg-pink-600"
                : "bg-white text-pink-500 border-pink-500 hover:bg-pink-50"
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

      {/* HERO SLIDER */}
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

      {/* WHY CHOOSE */}
      <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2">
          <img
            src="https://img.freepik.com/free-vector/running-sport-shoes-illustration_1284-17528.jpg"
            alt="Shoes"
            className="rounded-2xl shadow-lg"
          />
        </div>

        <div className="lg:w-1/2 space-y-5">
          <h2 className="text-4xl font-bold text-pink-600">
            Why Choose Our Shoes?
          </h2>

          <p className="text-gray-700">
            Premium materials, breathable comfort, and long-lasting durability.
          </p>

          <p className="text-gray-600">
            Designed for runners, workers, and everyday lifestyle.
          </p>
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