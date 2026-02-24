import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-blue-200 text-gray-800 px-6 py-12 overflow-hidden">
      {/* Top Section: Heading and Description */}
      <motion.div 
        className="text-center max-w-3xl mx-auto mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1 
          className="text-4xl font-bold mb-4 text-pink-600"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 150 }}
        >
          Contact US
        </motion.h1>
        <motion.p 
          className="text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
           At D&D Shoes, we combine craftsmanship with style to bring you the finest footwear. 
           Every pair is designed for comfort, durability, and to elevate your look wherever you go.
        </motion.p>
      </motion.div>

      {/* Middle Section: Contact Info with Icons */}
      <motion.div 
        className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        {[
          { icon: FaMapMarkerAlt, title: "Visit Our Shop", lines: ["Durga Chouk , Bharweli , Balghat", "Madhay Pradesh,india"] },
          { icon: FaPhoneAlt, title: "Let's Talk", lines: ["1800-154-178", "9284098642"] },
          { icon: FaEnvelope, title: "Email", lines: ["d&d@gmail.com", "online@example.com"] }
        ].map((item, idx) => (
          <motion.div 
            key={idx}
            className="flex flex-col items-center space-y-2"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 + idx * 0.2, duration: 0.6 }}
            whileHover={{ 
              scale: 1.05,
              transition: { type: "spring", stiffness: 300 }
            }}
          >
            <motion.div
              animate={{ 
                rotate: [0, 360],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 5,
                ease: "easeInOut"
              }}
            >
              <item.icon className="text-pink-600 text-3xl" />
            </motion.div>
            <motion.h3 
              className="text-xl font-semibold text-pink-600"
              whileHover={{ scale: 1.1 }}
            >
              {item.title}
            </motion.h3>
            {item.lines.map((line, i) => (
              <motion.p 
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + idx * 0.2 + i * 0.1 }}
              >
                {line}
              </motion.p>
            ))}
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom Section: Map and Contact Form */}
      <motion.div 
        className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        {/* Google Map with Message */}
        <motion.div 
          className="space-y-6"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <motion.div 
            className="bg-gray-100 p-4 rounded-lg shadow text-sm text-red-700"
            whileHover={{ scale: 1.02 }}
          >
            <p><strong>This page can't load Google Maps correctly.</strong></p>
            <p>Do you own this website? <span className="text-blue-500 underline cursor-pointer">OK</span></p>
          </motion.div>
          <motion.div 
            className="rounded overflow-hidden shadow-lg"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
            }}
            transition={{ duration: 0.3 }}
          >
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14813.822623309698!2d80.22058414360954!3d21.839953248045337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a2a5b96b6498943%3A0xe5501479aa294ba8!2sBharveli%2C%20Madhya%20Pradesh%20481102!5e0!3m2!1sen!2sin!4v1748336604647!5m2!1sen!2sin"  referrerpolicy="no-referrer-when-downgrade"

              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </motion.div>
        </motion.div>

        {/* Contact Form */}
        <motion.div 
          className="bg-white border border-gray-300 shadow-lg rounded-lg p-8"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          whileHover={{ 
            boxShadow: "0 25px 50px -12px rgba(236, 72, 153, 0.25)"
          }}
        >
          <motion.h3 
            className="text-2xl font-bold mb-6 text-pink-600"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.5 }}
          >
            Send Us a Message
          </motion.h3>
          <form className="space-y-4">
            {[
              { type: "text", placeholder: "Name", delay: 1.5 },
              { type: "email", placeholder: "Email", delay: 1.6 },
              { type: "text", placeholder: "Phone", delay: 1.7 },
              { type: "text", placeholder: "Subject", delay: 1.8 }
            ].map((field, idx) => (
              <motion.input
                key={idx}
                type={field.type}
                placeholder={field.placeholder}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-pink-500"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: field.delay, duration: 0.4 }}
                whileFocus={{ 
                  scale: 1.02,
                  borderColor: "#ec4899",
                  boxShadow: "0 0 0 3px rgba(236, 72, 153, 0.1)"
                }}
              />
            ))}
            <motion.textarea
              placeholder="Message"
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-pink-500"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.9, duration: 0.4 }}
              whileFocus={{ 
                scale: 1.02,
                borderColor: "#ec4899",
                boxShadow: "0 0 0 3px rgba(236, 72, 153, 0.1)"
              }}
            ></motion.textarea>
            <motion.button
              type="submit"
              className="bg-pink-600 text-white px-6 py-2 rounded"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 2, duration: 0.5, type: "spring", stiffness: 200 }}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "#be185d",
                boxShadow: "0 10px 25px -5px rgba(236, 72, 153, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Submit
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Contact;
