import React from "react";
import { useWishlist } from "../context/WishlistContext";
import { Link } from "react-router-dom";

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();

  return (
    <div className="p-8 bg-gradient-to-r from-green-100 to-blue-200 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">My Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <p className="text-center text-lg text-gray-600">Your wishlist is empty.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow-md">
            <thead>
              <tr className="bg-pink-200 text-left">
                <th className="py-3 px-6">Image</th>
                <th className="py-3 px-6">Product Name</th>
                <th className="py-3 px-6">Price</th>
                <th className="py-3 px-6">Quantity</th>
                <th className="py-3 px-6">Total Price</th>
                <th className="py-3 px-6">Action</th>
              </tr>
            </thead>
            <tbody>
              {wishlistItems.map((item) => (
                <tr key={item._id} className="border-t hover:bg-yellow-50">
                  <td className="py-4 px-6">
                    <img
                      src={`http://localhost:5000/${item.image}`}
                      alt={item.name}
                      className="h-20 w-20 object-cover rounded"
                    />
                  </td>
                  <td className="py-4 px-6 font-semibold">{item.name}</td>
                  <td className="py-4 px-6 text-green-700 font-bold">₹{item.price}</td>
                  <td className="py-4 px-6">1</td>
                  <td className="py-4 px-6 text-blue-600 font-semibold">₹{item.price}</td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <Link
                        to={`/product/${item._id}`}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => removeFromWishlist(item._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
