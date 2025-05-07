import React, { useState } from 'react';

const SearchBar = ({ products, setFiltered }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    const results = products.filter(p =>
      p.name.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(results);
  };

  return (
    <div className="flex w-full max-w-xl">
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={handleSearch}
        className="flex-1 p-2 border rounded-l shadow-sm text-black"
      />
      <button
        type="button"
        className="bg-yellow-500 px-4 rounded-r hover:bg-yellow-600"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
