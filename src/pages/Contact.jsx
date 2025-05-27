import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-blue-200 text-gray-800 px-6 py-12">
      {/* Top Section: Heading and Description */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4 text-pink-600">Contact US</h1>
        <p className="text-lg">
           At D&D Shoes, we combine craftsmanship with style to bring you the finest footwear. 
           Every pair is designed for comfort, durability, and to elevate your look wherever you go.
        </p>
      </div>

      {/* Middle Section: Contact Info with Icons */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center mb-16">
        <div className="flex flex-col items-center space-y-2">
          <FaMapMarkerAlt className="text-pink-600 text-3xl" />
          <h3 className="text-xl font-semibold text-pink-600">Visit Our Shop</h3>
          <p>Durga Chouk , Bharweli , Balghat</p>
          <p>Madhay Pradesh,india</p>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <FaPhoneAlt className="text-pink-600 text-3xl" />
          <h3 className="text-xl font-semibold text-pink-600">Let’s Talk</h3>
          <p>1800-154-178</p>
          <p>9284098642</p>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <FaEnvelope className="text-pink-600 text-3xl" />
          <h3 className="text-xl font-semibold text-pink-600">Email</h3>
          <p>d&d@gmail.com</p>
          <p>online@example.com</p>
        </div>
      </div>

      {/* Bottom Section: Map and Contact Form */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Google Map with Message */}
        <div className="space-y-6">
          <div className="bg-gray-100 p-4 rounded-lg shadow text-sm text-red-700">
            <p><strong>This page can't load Google Maps correctly.</strong></p>
            <p>Do you own this website? <span className="text-blue-500 underline cursor-pointer">OK</span></p>
          </div>
          <div className="rounded overflow-hidden shadow-lg">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.8272873944647!2d-74.00471608459258!3d40.71305444524464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316da173d1%3A0x50a78c117b285f93!2sBroadway%2C%20New%20York%2C%20NY%2010013%2C%20USA!5e0!3m2!1sen!2sin!4v1626762032409!5m2!1sen!2sin"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white border border-gray-300 shadow-lg rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-6 text-pink-600">Send Us a Message</h3>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-pink-500"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-pink-500"
            />
            <input
              type="text"
              placeholder="Phone"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-pink-500"
            />
            <input
              type="text"
              placeholder="Subjact"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-pink-500"
            />
            <textarea
              placeholder="Meassage"
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-pink-500"
            ></textarea>
            <button
              type="submit"
              className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
