import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add product to cart (with quantity = 1 and default image)
  const addToCart = (product) => {
    // Handle both MongoDB (_id) and Supabase (id) formats
    const productId = product._id || product.id;
    const exists = cart.find((item) => (item._id || item.id) === productId);
    
    if (exists) {
      toast.info("Product already in cart", { autoClose: 1500 });
    } else {
      const formattedProduct = {
        ...product,
        _id: productId, // Normalize to _id for consistency
        image: product.image || product.images?.[0],
        quantity: 1,
      };
      setCart([...cart, formattedProduct]);
      toast.success("Added to cart!", { autoClose: 1500 });
    }
  };

  // Remove product by ID
  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => (item._id || item.id) !== id);
    setCart(updatedCart);
    toast.success("Removed from cart", { autoClose: 1500 });
  };

  // Update product quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCart = cart.map((item) =>
      (item._id || item.id) === id ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
