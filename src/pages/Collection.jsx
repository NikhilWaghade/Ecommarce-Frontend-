import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOption, setSortOption] = useState("relevant");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        console.log("Fetched Products:", data);
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch products", error);
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

  const filteredProducts = products
    .filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((item) =>
      selectedCategories.length === 0
        ? true
        : selectedCategories.includes(item.category)
    )
    .sort((a, b) => {
      if (sortOption === "lowToHigh") return a.price - b.price;
      if (sortOption === "highToLow") return b.price - a.price;
      return 0;
    });

  const allCategories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="mx-auto px-4 py-8 bg-gradient-to-r from-green-100 to-blue-200">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-1/4 space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-2">Filters</h2>
            <div className="space-y-2">
              {allCategories.map((cat) => (
                <label key={cat} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => handleCategoryChange(cat)}
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h1 className="text-3xl font-semibold">All Collections</h1>
            <div className="flex gap-4">
              {/* Search Input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-64"
                />
                <FaSearch className="absolute top-3 left-3 text-gray-500" />
              </div>

              {/* Sort Dropdown */}
              <select
                onChange={(e) => setSortOption(e.target.value)}
                className="border border-gray-300 p-2 rounded-md"
              >
                <option value="relevant">Sort by: Relevant</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((item) => (
              <Link to={`/product/${item._id}`} key={item._id}>
                <div className="bg-white rounded-xl shadow hover:shadow-xl transition transform hover:scale-105 duration-300 overflow-hidden cursor-pointer border border-transparent hover:border-pink-500">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-60 object-cover"
                  />
                  <div className="p-4 text-center">
                    <h3 className="text-md font-semibold">{item.name}</h3>
                    <p className="text-green-600 font-bold text-lg mt-2">
                      ₹{item.price}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <p className="text-gray-600 mt-6 text-center">
              No products found.
            </p>
          )}
        </main>
      </div>
    </div>
  );
};

export default CollectionPage;
