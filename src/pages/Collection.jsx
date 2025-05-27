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
      item?.name?.toLowerCase().includes(search.toLowerCase())
    )
    .filter((item) =>
      selectedCategories.length === 0
        ? true
        : selectedCategories.includes(item?.category)
    )
    .sort((a, b) => {
      if (sortOption === "lowToHigh") return a.price - b.price;
      if (sortOption === "highToLow") return b.price - a.price;
      return 0;
    });

  const allCategories = [
    ...new Set(products.map((p) => p.category).filter(Boolean)),
  ];

  return (
    <div className="mx-auto px-4 py-8 bg-gradient-to-r from-green-100 to-blue-200 min-h-screen">
      {/* Title */}
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        New Trendy Bag Collection
      </h1>

      {/* Top Filter Tabs */}
      <div className="flex justify-center flex-wrap gap-4 mb-10">
        {allCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium border transition duration-300 ${
              selectedCategories.includes(cat)
                ? "bg-pink-600 text-white border-pink-700 shadow-md"
                : "bg-white text-gray-700 border-gray-300 hover:bg-pink-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Sidebar Filters */}
    <aside className="w-full md:w-1/4 bg-gradient-to-r from-green-100 to-blue-200 p-6 rounded-2xl shadow-lg -mt-44">
  <h2 className="text-2xl font-semibold mb-6 text-gray-800">Filter by Category</h2>
  <div className="space-y-4">
    {allCategories.map((cat) => (
      <label
        key={cat}
        className="flex items-center gap-3 text-gray-800 hover:text-pink-600 transition-colors duration-200 cursor-pointer"
      >
        <input
          type="checkbox"
          checked={selectedCategories.includes(cat)}
          onChange={() => handleCategoryChange(cat)}
          className="accent-pink-500 w-4 h-4 rounded-sm"
        />
        <span className="text-base">{cat}</span>
      </label>
    ))}
  </div>
</aside>


        {/* Main Content */}
        <main className="flex-1">
          {/* Search + Sort */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div className="flex gap-4 flex-wrap items-center justify-center md:justify-end w-full">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-64 shadow-sm"
                />
                <FaSearch className="absolute top-3 left-3 text-gray-500" />
              </div>

              {/* Sort */}
              <select
                onChange={(e) => setSortOption(e.target.value)}
                className="border border-gray-300 p-2 rounded-md shadow-sm"
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
                <div className="bg-white rounded-xl shadow hover:shadow-lg transition transform hover:scale-105 duration-300 overflow-hidden border border-transparent hover:border-pink-500">
                  <img
                    src={`http://localhost:5000/${item.image}`}
                    alt={item.name}
                    className="w-full h-60 object-cover"
                  />
                  <div className="p-4 text-center">
                    <h3 className="text-md font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-green-600 font-bold text-lg mt-2">₹{item.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* No Products */}
          {filteredProducts.length === 0 && (
            <p className="text-gray-600 mt-10 text-center text-lg font-medium">
              No products found for your search or filters.
            </p>
          )}
        </main>
      </div>
    </div>
  );
};

export default CollectionPage;
