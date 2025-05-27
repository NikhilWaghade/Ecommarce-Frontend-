import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
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
    image: "https://theambiencehome.com/cdn/shop/files/5f9f3e64-7b34-4b58-a5b5-a5d1029c0647.jpg?v=1740511005&width=533",
    title: "Classic Style",
    description: " Collection",
  },
  {
    image: "https://theambiencehome.com/cdn/shop/files/1622360290787.jpg?v=1740676927&width=533",
    title: "Summer Vibes",
    description: " Collection",
  },
  {
    image: "https://theambiencehome.com/cdn/shop/files/2187485522408.jpg?v=1740677243&width=533",
    title: "Modern Look",
    description: " Collection",
  },
  {
    image: "https://theambiencehome.com/cdn/shop/files/86070973054.jpg?v=1740688500&width=533",
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
    <div className="pt-20 px-4 md:px-16 bg-gradient-to-r from-green-100 to-blue-200 text-black">
      {/* About Us */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-600">
          This is Photoshop's version of Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet.
          Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat.
        </p>
      </section>

      {/* About the Company */}
    <section className="mb-16 flex flex-col md:flex-row items-start gap-8">
  {/* Company Logo */}
  <div className="md:w-1/3 flex justify-center w-56">
    <img
      src="src/assets/logo(final).jpg" // Replace this with your actual logo path
      alt="Company Logo"
      className=" md:w-64 object-contain"
    />
  </div>

  {/* Company Description */}
  <div className="md:w-2/3">
    <h2 className="text-3xl font-semibold mb-4">About the Company</h2>
    <p className="text-gray-600 leading-relaxed">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat.
    </p>
    <p className="mt-4 text-gray-600 leading-relaxed">
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
      mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem
      accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
      veritatis.
    </p>
    <p className="mt-4 text-gray-600">
      Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
      consequuntur magni dolores.
    </p>
  </div>
</section>


      {/* New Trendy Bag Collection */}
     <section className="mb-16">
      <h2 className="text-3xl font-semibold mb-6 text-center">New Trendy Bag Collection</h2>

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
            <div className="border p-6 rounded shadow hover:shadow-lg hover:shadow-pink-600 bg-sky-100 transition flex flex-col items-center text-center">
              <img
                src={image}
                alt={`${title} ${idx + 1}`}
                className="mb-4 w-full h-80 object-cover rounded"
              />
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-500">{description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>

      {/* Fashion Model Collection */}
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

      {/* Hot Deal Section */}
 <section className="mb-16 text-center bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 p-10 rounded-3xl shadow-2xl text-white">
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
</section>



      {/* For Him & Her */}
      <section className=" grid md:grid-cols-2 gap-12">
        {/* For Him */}
        <div>
          <h2 className="text-3xl font-semibold mb-2">For Him</h2>
          <h4 className="text-xl text-gray-800 mb-4">Amazing Shoes for men</h4>
          <p className="text-gray-600 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p className="text-gray-600">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
            id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
            doloremque laudantium.
          </p>
        </div>

        {/* For Her */}
        <div>
          <h2 className="text-3xl font-semibold mb-2">For Her</h2>
          <h4 className="text-xl text-gray-600 mb-4">Amazing Shoes for women</h4>
          <p className="text-gray-600 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p className="text-gray-600">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
            id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
            doloremque laudantium.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
