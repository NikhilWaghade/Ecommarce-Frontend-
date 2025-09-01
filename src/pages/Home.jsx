import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../Components/ProductCard';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import hero1 from '../assets/hero-image1.jpg';
import hero2 from '../assets/hero-image2.jpg';
import hero3 from '../assets/hero-image3.jpg';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [highPriceProducts, setHighPriceProducts] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  // Fetch products
  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => {
        const allProducts = res.data;
        setProducts(allProducts);

        const top5Expensive = [...allProducts]
          .filter(p => typeof p.price === 'number')
          .sort((a, b) => b.price - a.price)
          .slice(0, 5);

        setHighPriceProducts(top5Expensive);
      })
      .catch(err => console.error(err));
  }, []);

  // Wishlist toggle function
  const handleWishlistToggle = (product) => {
    setWishlistItems(prev =>
      prev.some(p => p._id === product._id)
        ? prev.filter(p => p._id !== product._id)
        : [...prev, product]
    );
  };

  // Offer timer logic
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetTime = new Date();
    targetTime.setHours(targetTime.getHours() + 2);

    const updateTimer = () => {
      const now = new Date();
      const difference = targetTime - now;

      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    };

    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-green-100 to-blue-200 min-h-screen">
      {/* Top Banner Swiper */}
      <div className="w-full">
        <Swiper modules={[Autoplay]} autoplay={{ delay: 3000 }} loop>
          {[hero1, hero2, hero3].map((img, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={img}
                alt={`Slider ${idx + 1}`}
                className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Latest Products */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold mb-6 text-center sm:text-left">Latest Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard
              key={product._id}
              product={product}
              wishlistItems={wishlistItems}
              handleWishlistToggle={handleWishlistToggle}
            />
          ))}
        </div>
      </div>

      {/* Banner Section with Text and Image Swiper */}
      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row items-center gap-10">
        <div className="w-full lg:w-1/2">
          <Swiper modules={[Autoplay]} autoplay={{ delay: 2500 }} loop>
            {[
              'https://img.freepik.com/free-vector/running-sport-shoes-illustration_1284-17528.jpg',
              'https://img.freepik.com/premium-photo/ivory-female-wedding-footwear-isolated-white_254969-303.jpg',
              'https://img.freepik.com/premium-photo/sneakers-boots_87394-530.jpg',
            ].map((url, idx) => (
              <SwiperSlide key={idx}>
                <img src={url} alt={`Banner ${idx + 1}`} className="rounded-xl w-full h-60 sm:h-72 md:h-80 lg:h-96 object-cover shadow-md" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="w-full lg:w-1/2 space-y-4 text-center lg:text-left">
          <h2 className="text-3xl font-bold text-pink-600">Why Choose Our Shoes?</h2>
          <p className="text-gray-700">Our shoes are designed with passion, precision, and premium materials...</p>
          <p className="text-gray-600">Walk the streets or run the track — unmatched durability and support await.</p>
        </div>
      </div>

      {/* Offer & Countdown Section */}
      <section className="relative bg-gradient-to-r from-purple-900 via-indigo-900 to-gray-900 text-white py-24 text-center overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <h2 className="text-5xl font-extrabold text-teal-300 mb-4">TODAY'S SPECIAL Offer</h2>
          <p className="text-lg text-gray-300 mb-10">⚡ Don’t miss out — exclusive deals disappear fast!</p>
          <div className="flex justify-center gap-6 mb-12">
            {['Hours', 'Minutes', 'Seconds'].map((label, idx) => (
              <div
                key={label}
                className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 w-24 shadow-xl hover:scale-105 transition"
              >
                <div className="text-3xl font-bold text-lime-300">
                  {String(Object.values(timeLeft)[idx]).padStart(2, '0')}
                </div>
                <div className="text-sm text-gray-200 mt-1">{label}</div>
              </div>
            ))}
          </div>
          <button className="bg-gradient-to-r from-cyan-400 to-lime-300 text-black font-bold px-10 py-3 rounded-full hover:scale-110 transition">
            Claim Your Deal
          </button>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-cyan-400/10 via-purple-900/30 to-black/90 opacity-30 z-0" />
      </section>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6 text-center sm:text-left">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {highPriceProducts.map(product => (
            <ProductCard
              key={product._id}
              product={product}
              wishlistItems={wishlistItems}
              handleWishlistToggle={handleWishlistToggle}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
