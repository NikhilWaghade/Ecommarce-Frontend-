// context/WishlistContext.js
import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  const addToWishlist = (product) => {
    setWishlistItems((prev) => {
      const productId = product._id || product.id;
      const exists = prev.find((item) => (item._id || item.id) === productId);
      
      if (exists) {
        // Already in wishlist, don't add again
        return prev;
      }
      
      // Add product to wishlist (allow multiple products)
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((prev) => prev.filter((item) => (item._id || item.id) !== productId));
  };

  return (
    <WishlistContext.Provider
      value={{ wishlistItems, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
