import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../Components/ProductCard';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [highPriceProducts, setHighPriceProducts] = useState([]);

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
      .catch(err => {
        console.error(err);
      });
  }, []);

     // offer timer 
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetTime = new Date();
    targetTime.setHours(targetTime.getHours() + 2); // 2-hour limited offer

    const updateTimer = () => {
      const now = new Date();
      const difference = targetTime - now;

      if (difference > 0) {
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ hours, minutes, seconds });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    };

    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, []);


  return (
    <div className="bg-gradient-to-r from-green-100 to-blue-200 min-h-screen">
      {/* 1. Top Swiper Banner */}
      <div className="w-full">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          className="w-full"
        >
          <SwiperSlide>
            <img
              src="src/assets/hero-image1.jpg"
              alt="Slider 1"
              className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="src/assets/hero-image2.jpg"
              alt="Slider 2"
              className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="src/assets/hero-image3.jpg"
              alt="Slider 3"
              className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover"
            />
          </SwiperSlide>
        </Swiper>
      </div>

      {/* 2. Latest Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 text-center sm:text-left">Latest Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>

      {/* 3. Banner Section with Image Swiper and Text */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row items-center gap-10">
        {/* Left: Image Swiper */}
        <div className="w-full lg:w-1/2">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop={true}
          >
            <SwiperSlide>
              <img
                src="https://img.freepik.com/free-vector/running-sport-shoes-illustration_1284-17528.jpg"
                alt="Banner 1"
                className="rounded-xl w-full h-60 sm:h-72 md:h-80 lg:h-96 object-cover shadow-md"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://img.freepik.com/premium-photo/ivory-female-wedding-footwear-isolated-white_254969-303.jpg"
                alt="Banner 2"
                className="rounded-xl w-full h-60 sm:h-72 md:h-80 lg:h-96 object-cover shadow-md"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://img.freepik.com/premium-photo/sneakers-boots_87394-530.jpg"
                alt="Banner 3"
                className="rounded-xl w-full h-60 sm:h-72 md:h-80 lg:h-96 object-cover shadow-md"
              />
            </SwiperSlide>
          </Swiper>
        </div>

        {/* Right: Text Content */}
        <div className="w-full lg:w-1/2 space-y-4 text-center lg:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-pink-600">Why Choose Our Shoes?</h2>
          <p className="text-gray-700 text-base sm:text-lg">
            Our shoes are designed with passion, precision, and premium materials. From casual sneakers to performance footwear, we combine comfort with cutting-edge style.
          </p>
          <p className="text-gray-600 text-sm sm:text-base">
            Whether you're walking the streets or running the track, our shoes deliver unmatched durability, support, and fashion — every step of the way.
          </p>
        </div>
      </div>

      {/* 4. offer and discount  */}
       <section className="relative bg-gradient-to-r from-purple-900 via-indigo-900 to-gray-900 text-white py-24 text-center overflow-hidden">
  <div className="max-w-5xl mx-auto px-6 relative z-10">
    <h2 className="text-5xl font-extrabold tracking-tight text-teal-300 mb-4">
      TODAY'S SPECIAL Offer
    </h2>
    <p className="text-lg text-gray-300 mb-10">
      ⚡ Don’t miss out — exclusive deals disappear fast!
    </p>

    {/* Countdown Timer */}
    <div className="flex justify-center gap-6 mb-12">
      {[
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Minutes', value: timeLeft.minutes },
        { label: 'Seconds', value: timeLeft.seconds },
      ].map((item, idx) => (
        <div
          key={idx}
          className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 w-24 shadow-xl hover:scale-105 transition-transform duration-200"
        >
          <div className="text-3xl font-bold text-lime-300">
            {String(item.value).padStart(2, '0')}
          </div>
          <div className="text-sm text-gray-200 mt-1">{item.label}</div>
        </div>
      ))}
    </div>

    <button className="bg-gradient-to-r from-cyan-400 to-lime-300 text-black font-bold px-10 py-3 rounded-full hover:scale-110 transition-transform shadow-md">
      Claim Your Deal
    </button>
  </div>

  {/* Decorative Glow */}
  <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-cyan-400/10 via-purple-900/30 to-black/90 opacity-30 z-0" />
</section>

      {/* 5. Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-4 text-pink-600">Best Sell Product's</h2>
        <p className="text-center text-gray-700 mb-10 text-sm sm:text-base">Check out the best offers to stay in trend</p>

        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {highPriceProducts.map((product) => (
            <SwiperSlide key={product._id}>
              <div className="bg-white rounded-xl shadow hover:shadow-xl transition transform hover:scale-105 duration-300 overflow-hidden cursor-pointer border border-transparent hover:border-pink-500">
                <img
                  src={`http://localhost:5000/${product.image}`}
                  alt={product.name}
                  className="w-full h-56 sm:h-60 object-cover hover:opacity-90 transition-opacity duration-300"
                />
                <div className="p-4 text-center">
                  <h3 className="text-md font-semibold">{product.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">Soft and comforting outwear</p>
                  <p className="text-green-600 font-bold text-lg mt-2">₹{product.price}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Home;
