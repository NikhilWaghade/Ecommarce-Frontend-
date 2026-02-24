import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Minimal Navigation Loader - Only shows a top progress bar
 * To use this instead of the full loader:
 * 1. Import this component instead of NavigationLoader in App.jsx
 * 2. Replace <NavigationLoader /> with <NavigationLoaderMinimal />
 */

const NavigationLoaderMinimal = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 400); // Faster for minimal version

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 z-[9999]"
          initial={{ scaleX: 0, transformOrigin: 'left' }}
          animate={{ scaleX: 1 }}
          exit={{ scaleX: 1, transformOrigin: 'right', opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          {/* Gradient Progress Bar */}
          <div className="w-full h-full bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 shadow-lg">
            {/* Shimmer Effect */}
            <motion.div
              className="w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent"
              animate={{ x: ['0%', '100%'] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NavigationLoaderMinimal;


