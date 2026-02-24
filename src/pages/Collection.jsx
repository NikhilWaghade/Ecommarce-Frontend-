import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaHeart,
  FaRegHeart,
  FaShoppingCart,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useWishlist } from "../context/WishlistContext";
import { motion, AnimatePresence } from "framer-motion";

const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOption, setSortOption] = useState("relevant");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("http://localhost:5000/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleWishlistToggle = (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    const productId = product._id || product.id;
    const exists = wishlistItems.find(
      (item) => (item._id || item.id) === productId
    );

    if (exists) {
      removeFromWishlist(productId);
      toast.success(`${product.name} removed from wishlist`);
    } else {
      addToWishlist(product);
      toast.success(`${product.name} added to wishlist`);
    }
  };

  const goToWishlistPage = () => navigate("/wishlist");

  // Category Deduplication (Safe)
  const allCategories = [
    ...new Map(
      products
        .filter((p) => p.category)
        .map((p) => {
          const clean = p.category.trim();
          return [clean.toLowerCase(), clean];
        })
    ).values(),
  ];

  const filteredProducts = products
    .filter((item) =>
      item?.name?.toLowerCase().includes(search.toLowerCase())
    )
    .filter((item) => {
      if (selectedCategories.length === 0) return true;
      const productCategory = item?.category?.trim().toLowerCase();
      const selectedNormalized = selectedCategories.map((c) =>
        c.toLowerCase()
      );
      return selectedNormalized.includes(productCategory);
    })
    .sort((a, b) => {
      if (sortOption === "lowToHigh") return a.price - b.price;
      if (sortOption === "highToLow") return b.price - a.price;
      return 0;
    });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-green-100 to-blue-200 min-h-screen px-4 py-8">
      <motion.h1
        className="text-4xl font-bold text-center mb-10 text-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        D&D E-Shop Footwear Collection
      </motion.h1>

      <div className="flex flex-col md:flex-row gap-8">

        {/* LEFT SIDEBAR */}
        <motion.aside
          className="w-full md:w-1/4 bg-white p-6 rounded-2xl shadow-lg h-fit"
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Categories
          </h2>

          <div className="space-y-3">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`w-full text-left px-4 py-2 rounded-lg transition font-medium ${
                  selectedCategories.includes(cat)
                    ? "bg-pink-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-pink-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={goToWishlistPage}
            className="mt-6 w-full bg-pink-600 text-white py-2 rounded-full hover:bg-pink-700 transition"
          >
            View Wishlist ({wishlistItems.length})
          </button>
        </motion.aside>

        {/* RIGHT PRODUCT SECTION */}
        <div className="flex-1">

          {/* Search + Sort */}
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-md w-64"
              />
              <FaSearch className="absolute top-3 left-3 text-gray-500" />
            </div>

            <select
              onChange={(e) => setSortOption(e.target.value)}
              className="border p-2 rounded-md"
            >
              <option value="relevant">Relevant</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
          </div>

          {/* Product Grid */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
            layout
          >
            <AnimatePresence>
              {filteredProducts.map((item) => {
                const itemId = item._id || item.id;
                const isWishlisted = wishlistItems.some(
                  (w) => (w._id || w.id) === itemId
                );

                return (
                  <motion.div
                    key={itemId}
                    className="bg-white rounded-xl shadow p-4 relative"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <Link to={`/product/${itemId}`}>
                      <img
                        src={
                          item.image
                            ? `http://localhost:5000/${item.image}`
                            : "/placeholder.jpg"
                        }
                        alt={item.name}
                        className="w-full h-48 object-cover rounded-md"
                      />
                    </Link>

                    <button
                      onClick={(e) => handleWishlistToggle(e, item)}
                      className="absolute top-3 right-3 bg-white p-2 rounded-full shadow"
                    >
                      {isWishlisted ? (
                        <FaHeart className="text-pink-600" />
                      ) : (
                        <FaRegHeart className="text-gray-500" />
                      )}
                    </button>

                    <h3 className="mt-3 font-semibold text-gray-800">
                      {item.name}
                    </h3>
                    <p className="text-green-600 font-bold mt-1">
                      ₹{item.price}
                    </p>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;