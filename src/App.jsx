// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom"; // No need for BrowserRouter here
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import AdminPanel from "./pages/AdminPanel";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Components/Footer";
import CollectionPage from "./pages/Collection";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <AuthProvider> {/* Wrap with AuthProvider */}
      <CartProvider> {/* Wrap with CartProvider */}
        <WishlistProvider> {/* Wrap with WishlistProvider */}
          <ToastContainer /> {/* For displaying toast notifications */}
          
          {/* Define your routes */}
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/collection" element={<CollectionPage />} />

          

          
          </Routes>

          <Footer/>

        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
    
  );
};

export default App;
