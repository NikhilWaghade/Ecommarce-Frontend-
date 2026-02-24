import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../Components/ProductCard";
import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

import hero1 from "../assets/hero-image1.jpg";
import hero2 from "../assets/hero-image2.jpg";
import hero3 from "../assets/hero-image3.jpg";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [highPriceProducts, setHighPriceProducts] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  const heroImages = [
    { id: "hero1", img: hero1 },
    { id: "hero2", img: hero2 },
    { id: "hero3", img: hero3 },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        const allProducts = res.data;
        setProducts(allProducts);

        const top5Expensive = [...allProducts]
          .filter((p) => typeof p.price === "number")
          .sort((a, b) => b.price - a.price)
          .slice(0, 5);

        setHighPriceProducts(top5Expensive);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleWishlistToggle = (product) => {
    setWishlistItems((prev) =>
      prev.some((p) => p._id === product._id)
        ? prev.filter((p) => p._id !== product._id)
        : [...prev, product],
    );
  };

  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

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
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-green-100 to-blue-200 min-h-screen overflow-hidden">
      {/* Hero Swiper */}
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Swiper modules={[Autoplay]} autoplay={{ delay: 3000 }} loop>
          {heroImages.map((item) => (
            <SwiperSlide key={item.id}>
              <motion.img
                src={item.img}
                alt={item.id}
                className="lg:w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] lg:object-cover  "
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5 }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      {/* Latest Products */}
      <motion.div className="max-w-7xl mx-auto px-4 py-10  ">
        <h2 className="text-3xl font-bold mb-6 text-center sm:text-left">
          Latest Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product._id || product.id || `product-${index}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard
                product={product}
                wishlistItems={wishlistItems}
                handleWishlistToggle={handleWishlistToggle}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/*shoes Banner Section */}
      <motion.div className="max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row items-center gap-10">
        <motion.div className="w-full overflow-hidden lg:w-1/2">
          <Swiper modules={[Autoplay]} autoplay={{ delay: 2500 }} loop>
            {[
              {
                id: "b1",
                url: "https://img.freepik.com/free-vector/running-sport-shoes-illustration_1284-17528.jpg",
              },
              {
                id: "b2",
                url: "https://img.freepik.com/premium-photo/ivory-female-wedding-footwear-isolated-white_254969-303.jpg",
              },
              {
                id: "b3",
                url: "https://img.freepik.com/premium-photo/sneakers-boots_87394-530.jpg",
              },
            ].map((item) => (
              <SwiperSlide key={item.id}>
                <img
                  src={item.url}
                  alt={item.id}
                  className="rounded-xl w-full h-60 sm:h-72 md:h-80 lg:h-96 object-cover shadow-md sm:ml-16"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        <motion.div className="w-full lg:w-1/2 space-y-4 text-center lg:text-left">
          <h2 className="text-3xl font-bold text-pink-600">
            Why Choose Our Shoes?
          </h2>
          <p className="text-gray-700">
            Our shoes are designed with passion, precision, and premium
            materials...
          </p>
          <p className="text-gray-600">
            Walk the streets or run the track — unmatched durability and support
            await.
          </p>
        </motion.div>
      </motion.div>

      {/* Offer Section */}
      <section className="relative bg-gradient-to-r from-purple-900 via-indigo-900 to-gray-900 text-white py-24 text-center">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-5xl font-extrabold text-teal-300 mb-4">
            TODAY'S SPECIAL Offer
          </h2>
          <p className="text-lg text-gray-300 mb-10">
            ⚡ Don't miss out — exclusive deals disappear fast!
          </p>

          <div className="flex justify-center gap-6 mb-12">
            {["Hours", "Minutes", "Seconds"].map((label, idx) => (
              <div key={label} className="bg-white/10 rounded-2xl p-5 w-24">
                <div className="text-3xl font-bold text-lime-300">
                  {String(Object.values(timeLeft)[idx]).padStart(2, "0")}
                </div>
                <div className="text-sm text-gray-200 mt-1">{label}</div>
              </div>
            ))}
          </div>

          <button className="bg-gradient-to-r from-cyan-400 to-lime-300 text-black font-bold px-10 py-3 rounded-full">
            Claim Your Deal
          </button>
        </div>
      </section>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6 text-center sm:text-left">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {highPriceProducts.map((product, index) => (
            <motion.div
              key={`featured-${product._id || product.id || index}`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <ProductCard
                product={product}
                wishlistItems={wishlistItems}
                handleWishlistToggle={handleWishlistToggle}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
