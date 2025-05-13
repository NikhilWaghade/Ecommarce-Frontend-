import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../Components/ProductCard';
import SearchBar from '../components/SearchBar';
import Filter from '../Components/Filter';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => {
        setProducts(res.data);
        setFiltered(res.data); // Show all products by default
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <div className="bg-gradient-to-r from-green-100 to-blue-200 min-h-screen">
      
      {/* Swiper Section */}
      <div className="w-full">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          className="w-full"
        >
          <SwiperSlide>
            <img
              src="https://images.pexels.com/photos/2300334/pexels-photo-2300334.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Slider 1"
              className="w-full h-[300px] md:h-[500px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://images.pexels.com/photos/1503009/pexels-photo-1503009.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Slider 2"
              className="w-full h-[300px] md:h-[500px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Slider 3"
              className="w-full h-[300px] md:h-[500px] object-cover"
            />
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Main Section with Sidebar and Products */}
      <div className="max-w-7xl mx-auto flex gap-4 p-4">

        {/* Left Sidebar - Fixed Filters */}
        <div className="w-[250px] sticky top-4 self-start mr-28">
          <SearchBar products={products} setFiltered={setFiltered} />
          <Filter products={products} setFiltered={setFiltered} />
        </div>

        {/* Right Content - Products */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4">All Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
