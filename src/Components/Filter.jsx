import React, { useState, useEffect } from 'react';

const Filter = ({ products, setFiltered }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Set categories when products change
  useEffect(() => {
    const uniqueCategories = ['All', ...new Set(products.map(p => p.category))];
    setCategories(uniqueCategories);
  }, [products]);

  // Filter products when selectedCategory or products change
  useEffect(() => {
    if (selectedCategory === 'All') {
      setFiltered(products);
    } else {
      const filteredProducts = products.filter(p => p.category === selectedCategory);
      setFiltered(filteredProducts);
    }
  }, [selectedCategory, products, setFiltered]);

  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Filter by Category</h3>
      <div className="space-y-2">
        {categories.map((cat) => (
          <label key={cat} className="flex items-center gap-2">
            <input
              type="radio"
              name="category"
              value={cat}
              checked={selectedCategory === cat}
              onChange={handleChange}
              className="form-radio text-blue-600"
            />
            <span className="capitalize">{cat}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Filter;
