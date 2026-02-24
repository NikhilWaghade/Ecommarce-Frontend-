import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { motion } from 'framer-motion';

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.footer 
      className="bg-[#046169] text-white overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div 
        className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* About */}
        <motion.div variants={itemVariants}>
          <motion.h3 
            className="text-xl font-bold mb-4"
            whileHover={{ scale: 1.05, color: "#10b981" }}
          >
            About Us
          </motion.h3>
          <motion.p 
            className="text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Welcome to our e-commerce store! We offer high-quality products at the best prices with fast delivery and customer-first support.
          </motion.p>
        </motion.div>

        {/* Quick Links */}
        <motion.div variants={itemVariants}>
          <motion.h3 
            className="text-xl font-bold mb-4"
            whileHover={{ scale: 1.05, color: "#10b981" }}
          >
            Quick Links
          </motion.h3>
          <ul className="space-y-2 text-lg">
            {[
              { to: "/shop", label: "Shop" },
              { to: "/contact", label: "Contact" },
              { to: "/faq", label: "FAQ" },
              { to: "/about", label: "About Us" }
            ].map((link, idx) => (
              <motion.li 
                key={idx}
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx }}
              >
                <Link to={link.to}>
                  <motion.span
                    className="inline-block"
                    whileHover={{ 
                      x: 5,
                      color: "#10b981"
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {link.label}
                  </motion.span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Customer Service */}
        <motion.div variants={itemVariants}>
          <motion.h3 
            className="text-xl font-bold mb-4"
            whileHover={{ scale: 1.05, color: "#10b981" }}
          >
            Customer Service
          </motion.h3>
          <ul className="space-y-2 text-lg">
            {[
              { to: "/shipping", label: "Shipping Policy" },
              { to: "/returns", label: "Return Policy" },
              { to: "/privacy", label: "Privacy Policy" },
              { to: "/terms", label: "Terms & Conditions" }
            ].map((link, idx) => (
              <motion.li 
                key={idx}
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx }}
              >
                <Link to={link.to}>
                  <motion.span
                    className="inline-block"
                    whileHover={{ 
                      x: 5,
                      color: "#10b981"
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {link.label}
                  </motion.span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Newsletter & Social */}
        <motion.div variants={itemVariants}>
          <motion.h3 
            className="text-xl font-bold mb-4"
            whileHover={{ scale: 1.05, color: "#10b981" }}
          >
            Join Our Newsletter
          </motion.h3>
          <motion.p 
            className="text-lg mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Get the latest updates and offers.
          </motion.p>
          <motion.form 
            className="flex"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <motion.input
              type="email"
              placeholder="Your email"
              className="w-full p-2 rounded-l bg-white text-black focus:outline-none"
              whileFocus={{ 
                scale: 1.02,
                boxShadow: "0 0 0 2px #10b981"
              }}
            />
            <motion.button 
              className="bg-blue-600 px-4 py-2 rounded-r"
              whileHover={{ 
                backgroundColor: "#1d4ed8",
                scale: 1.05
              }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
          </motion.form>
          <div className="flex gap-4 mt-6">
            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, idx) => (
              <motion.a 
                key={idx}
                href="#"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: 0.4 + idx * 0.1,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{ 
                  scale: 1.3,
                  color: "#10b981",
                  rotate: 360
                }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom bar */}
      <motion.div 
        className="border-t border-gray-800 py-4 text-center text-sm text-gray-400"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        &copy; {new Date().getFullYear()} YourStoreName. All rights reserved.
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
