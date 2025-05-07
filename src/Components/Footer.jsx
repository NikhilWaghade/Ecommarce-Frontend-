import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-green-100 via-gray-500 to-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* About */}
        <div>
          <h3 className="text-xl font-bold mb-4">About Us</h3>
          <p className="text-lg">
            Welcome to our e-commerce store! We offer high-quality products at the best prices with fast delivery and customer-first support.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-lg">
            <li><Link to="/shop" className="hover:text-green-700">Shop</Link></li>
            <li><Link to="/contact" className="hover:text-green-700">Contact</Link></li>
            <li><Link to="/faq" className="hover:text-green-700">FAQ</Link></li>
            <li><Link to="/about" className="hover:text-green-700">About Us</Link></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-xl font-bold mb-4">Customer Service</h3>
          <ul className="space-y-2 text-lg">
            <li><Link to="/shipping" className="hover:text-green-700">Shipping Policy</Link></li>
            <li><Link to="/returns" className="hover:text-green-700">Return Policy</Link></li>
            <li><Link to="/privacy" className="hover:text-green-700">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-green-700">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Newsletter & Social */}
        <div>
          <h3 className="text-xl font-bold mb-4">Join Our Newsletter</h3>
          <p className="text-lg mb-4">Get the latest updates and offers.</p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="w-full p-2 rounded-l bg-white text-black focus:outline-none"
            />
            <button className="bg-blue-600 px-4 py-2 rounded-r hover:bg-blue-700 transition">
              Subscribe
            </button>
          </form>
          <div className="flex gap-4 mt-6 ">
            <a href="#" className="hover:text-green-700"><FaFacebookF /></a>
            <a href="#" className="hover:text-green-700"><FaTwitter /></a>
            <a href="#" className="hover:text-green-700"><FaInstagram /></a>
            <a href="#" className="hover:text-green-700"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 py-4 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} YourStoreName. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
