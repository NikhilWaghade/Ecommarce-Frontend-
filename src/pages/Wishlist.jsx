import React from "react";
import { useWishlist } from "../context/WishlistContext";
import { Link } from "react-router-dom";

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();

  const getImageUrl = (item) => {
    const baseUrl = 'http://localhost:5000/';
    
    // Check if item has images array
    if (item.images && item.images.length > 0) {
      const imagePath = item.images[0];
      return imagePath.startsWith('http') ? imagePath : `${baseUrl}${imagePath}`;
    }
    
    // Fallback to single image
    if (item.image) {
      return item.image.startsWith('http') ? item.image : `${baseUrl}${item.image}`;
    }
    
    // Default placeholder
    return '/placeholder.jpg';
  };

  return (
    <div className="p-8 bg-gradient-to-r from-green-100 to-blue-200 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">My Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-4">Your wishlist is empty.</p>
          <Link 
            to="/" 
            className="inline-block bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition"
          >
            Continue Shopping
          </Link>
        </div>
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
              {wishlistItems.map((item) => {
                const itemId = item._id || item.id;
                return (
                  <tr key={itemId} className="border-t hover:bg-yellow-50">
                    <td className="py-4 px-6">
                      <Link to={`/product/${itemId}`}>
                        <img
                          src={getImageUrl(item)}
                          alt={item.name}
                          className="h-20 w-20 object-cover rounded cursor-pointer hover:opacity-80 transition"
                          onError={(e) => {
                            e.target.src = '/placeholder.jpg';
                          }}
                        />
                      </Link>
                    </td>
                    <td className="py-4 px-6">
                      <Link 
                        to={`/product/${itemId}`}
                        className="font-semibold hover:text-blue-600 transition"
                      >
                        {item.name}
                      </Link>
                    </td>
                    <td className="py-4 px-6 text-green-700 font-bold">₹{item.price}</td>
                    <td className="py-4 px-6">1</td>
                    <td className="py-4 px-6 text-blue-600 font-semibold">₹{item.price}</td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <Link
                          to={`/product/${itemId}`}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => removeFromWishlist(itemId)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
