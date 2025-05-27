import React from "react";
import { useWishlist } from "../context/WishlistContext";
import { Link } from "react-router-dom";

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();

  return (
    <div className="p-8 bg-gradient-to-r from-yellow-100 to-pink-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">My Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <p className="text-center text-lg text-gray-600">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow p-4 flex flex-col items-center"
            >
              <img
                src={`http://localhost:5000/${item.image}`}
                alt={item.name}
                className="w-full h-48 object-cover rounded"
              />
              <h2 className="mt-4 font-semibold text-lg">{item.name}</h2>
              <p className="text-green-700 font-bold">₹{item.price}</p>
              <div className="flex gap-2 mt-4">
                <Link
                  to={`/product/${item._id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  View
                </Link>
                <button
                  onClick={() => removeFromWishlist(item._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
