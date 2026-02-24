import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const About = () => {

    const Collection = [
  {
    image: "https://www.webstrot.com/html/theshop/images/categories/1.jpg",
    title: "New Trendy",
    description: " Collection",
  },
  {
    image: "https://i.pinimg.com/736x/6d/e0/74/6de074f1225aafafcc789de9ba9e0c07.jpg",
    title: "Classic Style",
    description: " Collection",
  },
  {
    image: "https://i.pinimg.com/736x/3a/e2/b5/3ae2b54534d8ed910cea6750ff2c4961.jpg",
    title: "Summer Vibes",
    description: " Collection",
  },
  {
    image: "https://i.pinimg.com/1200x/84/15/d5/8415d53e44c22d52365ffb4e39ecfcc3.jpg",
    title: "Modern Look",
    description: " Collection",
  },
  {
    image: "https://i.pinimg.com/736x/54/74/78/547478a641e0cba5fff07ace7d3d89d2.jpg",
    title: "Elegant Choice",
    description: " Collection",
  },
];

// offer timer 
 const offerEndTime = new Date().getTime() + 3 * 24 * 60 * 60 * 1000;

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = offerEndTime - now;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, []); // Empty dependency array = run once

  return (
    <div className="pt-20 px-4 md:px-16 bg-gradient-to-r from-green-100 to-blue-200 text-black overflow-hidden">
      {/* About Us */}
      <motion.section 
        className="text-center mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1 
          className="text-4xl font-bold mb-4"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 150 }}
        >
          About Us
        </motion.h1>
        <motion.p 
          className="max-w-2xl mx-auto text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Discover comfort, style, and quality with <strong> D&D E-shop </strong> — your go-to destination for premium footwear. From everyday essentials to trend-setting designs, we bring you shoes and slippers that fit your life perfectly.
        </motion.p>
      </motion.section>

      {/* About the Company */}
    <motion.section 
      className="mb-16 flex flex-col md:flex-row items-start gap-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      {/* Company Logo */}
      <motion.div 
        className="md:w-1/3 flex justify-center w-56"
        initial={{ x: -100, opacity: 0, rotate: -10 }}
        whileInView={{ x: 0, opacity: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, type: "spring" }}
        whileHover={{ scale: 1.05, rotate: [0, 5, -5, 0] }}
      >
        <img
          src="src/assets/logo(final).jpg"
          alt="Company Logo"
          className="md:w-64 object-contain"
        />
      </motion.div>

      {/* Company Description */}
      <div className="md:w-2/3">
        <motion.h2 
          className="text-3xl font-semibold mb-4"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          About the Company
        </motion.h2>
        <motion.p 
          className="leading-relaxed"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          At <strong>D&D E-shop</strong>, we believe the right footwear can transform your day. Whether you're heading out for a walk, dressing up for a special occasion, or simply relaxing at home, we've got the perfect pair for you. Our curated collection includes everything from stylish shoes and sandals to soft, durable slippers designed for all-day comfort.
        </motion.p>

        <motion.p 
          className="mt-4 leading-relaxed"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          We focus on delivering top-quality craftsmanship, modern designs, and exceptional value. Every product in our store is selected with care to ensure it meets our standards for comfort, durability, and style. Our goal is simple — to make sure you step out with confidence and comfort every single day.
        </motion.p>

        <motion.p 
          className="mt-4"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Join thousands of happy customers who trust D&D E-shop for their footwear needs. Experience the difference in every step.
        </motion.p>
      </div>
    </motion.section>


      {/* New Trendy Bag Collection */}
     <motion.section 
       className="mb-16"
       initial={{ opacity: 0, y: 50 }}
       whileInView={{ opacity: 1, y: 0 }}
       viewport={{ once: true, amount: 0.2 }}
       transition={{ duration: 0.8 }}
     >
      <motion.h2 
        className="text-3xl font-semibold mb-6 text-center"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        New Trendy Bag Collection
      </motion.h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]} 
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,         
          disableOnInteraction: false,
        }}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {Collection.map(({ image, title, description }, idx) => (
          <SwiperSlide key={idx}>
            <motion.div 
              className="border p-6 rounded shadow bg-sky-100 flex flex-col items-center text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(219, 39, 119, 0.4)",
                borderColor: "#ec4899"
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.img
                src={image}
                alt={`${title} ${idx + 1}`}
                className="mb-4 w-full h-80 object-cover rounded"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
              />
              <motion.h3 
                className="text-xl font-semibold mb-2"
                whileHover={{ color: "#ec4899" }}
              >
                {title}
              </motion.h3>
              <p className="text-gray-500">{description}</p>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.section>

      {/* Fashion Model Collection */}
       <motion.div 
         className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row items-center gap-10"
         initial={{ opacity: 0 }}
         whileInView={{ opacity: 1 }}
         viewport={{ once: true, amount: 0.3 }}
         transition={{ duration: 0.8 }}
       >
              {/* Left: Image Swiper */}
              <motion.div 
                className="w-full lg:w-1/2"
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Swiper
                  modules={[Autoplay]}
                  autoplay={{ delay: 2500, disableOnInteraction: false }}
                  loop={true}
                >
                  <SwiperSlide>
                    <motion.img
                      src="https://img.freepik.com/free-vector/running-sport-shoes-illustration_1284-17528.jpg"
                      alt="Banner 1"
                      className="rounded-xl w-full h-60 sm:h-72 md:h-80 lg:h-96 object-cover shadow-md"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <motion.img
                      src="https://img.freepik.com/premium-photo/ivory-female-wedding-footwear-isolated-white_254969-303.jpg"
                      alt="Banner 2"
                      className="rounded-xl w-full h-60 sm:h-72 md:h-80 lg:h-96 object-cover shadow-md"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <motion.img
                      src="https://img.freepik.com/premium-photo/sneakers-boots_87394-530.jpg"
                      alt="Banner 3"
                      className="rounded-xl w-full h-60 sm:h-72 md:h-80 lg:h-96 object-cover shadow-md"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                  </SwiperSlide>
                </Swiper>
              </motion.div>
      
              {/* Right: Text Content */}
              <motion.div 
                className="w-full lg:w-1/2 space-y-4 text-center lg:text-left"
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <motion.h2 
                  className="text-2xl sm:text-3xl font-bold text-pink-600"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Why Choose Our Shoes?
                </motion.h2>
                <motion.p 
                  className="text-gray-700 text-base sm:text-lg"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  Our shoes are designed with passion, precision, and premium materials. From casual sneakers to performance footwear, we combine comfort with cutting-edge style.
                </motion.p>
                <motion.p 
                  className="text-gray-600 text-sm sm:text-base"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                >
                  Whether you're walking the streets or running the track, our shoes deliver unmatched durability, support, and fashion — every step of the way.
                </motion.p>
              </motion.div>
            </motion.div>

      {/* Hot Deal Section */}
 {/* <section className="mb-16 text-center bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 p-10 rounded-3xl shadow-2xl text-white">
  <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 drop-shadow-md">
    🚀 Limited Time Offer: {timeLeft.days} Days Left – <span className="text-yellow-300">50% OFF</span>
  </h2>

  <div className="flex flex-wrap justify-center gap-6 text-white text-xl font-semibold">
    {[
      { label: "Days", value: timeLeft.days },
      { label: "Hours", value: timeLeft.hours },
      { label: "Minutes", value: timeLeft.minutes },
      { label: "Seconds", value: timeLeft.seconds },
    ].map((item, index) => (
      <div
        key={index}
        className="bg-gradient-to-br from-purple-700 to-indigo-900 w-24 h-24 sm:w-28 sm:h-28 rounded-xl flex flex-col items-center justify-center shadow-lg border border-purple-300 hover:scale-105 transform transition duration-300"
      >
        <p className="text-3xl sm:text-4xl font-bold text-yellow-200">
          {String(item.value).padStart(2, "0")}
        </p>
        <span className="text-xs sm:text-sm uppercase tracking-wider text-purple-100">
          {item.label}
        </span>
      </div>
    ))}
  </div>
</section> */}



      {/* For Him & Her */}
      <motion.section 
        className="grid md:grid-cols-2 gap-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        {/* For Him */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
        >
          <motion.h2 
            className="text-3xl font-semibold mb-2"
            whileHover={{ color: "#3b82f6" }}
          >
            For Him
          </motion.h2>
          <motion.h4 
            className="text-xl text-gray-800 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Amazing Shoes for men
          </motion.h4>
          <motion.p 
            className="text-gray-600 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat.
          </motion.p>
          <motion.p 
            className="text-gray-600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
            id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
            doloremque laudantium.
          </motion.p>
        </motion.div>

        {/* For Her */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
        >
          <motion.h2 
            className="text-3xl font-semibold mb-2"
            whileHover={{ color: "#ec4899" }}
          >
            For Her
          </motion.h2>
          <motion.h4 
            className="text-xl text-gray-600 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Amazing Shoes for women
          </motion.h4>
          <motion.p 
            className="text-gray-600 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat.
          </motion.p>
          <motion.p 
            className="text-gray-600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
            id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
            doloremque laudantium.
          </motion.p>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default About;
