import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const NavigationLoader = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Show loader when route changes
    setLoading(true);

    // Hide loader after a short delay to show smooth transition
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // Adjust timing as needed

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {loading && (
        <>
          {/* Top Progress Bar */}
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 z-[9999] shadow-lg"
            initial={{ scaleX: 0, transformOrigin: 'left' }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 1, transformOrigin: 'right' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />

          {/* Overlay with Spinner */}
          <motion.div
            className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[9998] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center gap-4">
              {/* Animated Spinner */}
              <motion.div
                className="relative w-16 h-16"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <div className="absolute inset-0 rounded-full border-4 border-pink-200"></div>
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-pink-600 border-r-purple-600"></div>
              </motion.div>

              {/* Loading Text */}
              <motion.p
                className="text-gray-700 font-medium text-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Loading...
              </motion.p>

              {/* Animated Dots */}
              <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-pink-600 rounded-full"
                    animate={{
                      y: [0, -10, 0],
                      opacity: [1, 0.5, 1]
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NavigationLoader;


