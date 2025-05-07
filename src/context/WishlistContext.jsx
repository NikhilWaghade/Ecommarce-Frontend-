// src/context/WishlistContext.js
import React, { createContext, useState, useContext } from "react";

// Create the context for wishlist
const WishlistContext = createContext();

// WishlistProvider component to wrap around your app and provide wishlist state
export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // Add item to wishlist
  const addToWishlist = (product) => {
    setWishlist([...wishlist, product]);
  };

  // Remove item from wishlist
  const removeFromWishlist = (productId) => {
    setWishlist(wishlist.filter((item) => item.id !== productId));
  };

  // Clear wishlist
  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, clearWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// Custom hook to use the WishlistContext
export const useWishlist = () => useContext(WishlistContext);
