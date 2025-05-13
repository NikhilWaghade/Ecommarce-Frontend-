import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  // Construct the image URL
  const baseUrl = 'http://localhost:5000/';
  const productImagePath = product.images?.[0] || product.image;
  const productImage = productImagePath ? `${baseUrl}${productImagePath}` : '/placeholder.jpg';

  return (
    <div className="border rounded p-4 shadow transition-transform transform hover:scale-105 hover:border-yellow-500 hover:shadow-xl">
      <Link to={`/product/${product._id}`}>
        <img
          src={productImage}
          alt={product.name}
          className="w-full h-48 object-cover rounded"
        />
        <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
        <p className="text-gray-600">₹{product.price}</p>
      </Link>
    </div>
  );
};

export default ProductCard;
