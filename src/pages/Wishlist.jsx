import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Your Wishlist</h2>

      {wishlistItems.length === 0 ? (
        <p>No items in wishlist.</p>
      ) : (
        <>
          {/* Header Row */}
          <div className="grid grid-cols-6 gap-4 font-semibold border-b py-3">
            <div>Image</div>
            <div className="col-span-2">Product Name</div>
            <div>Price</div>
            <div>Availability</div>
            <div>Action</div>
          </div>

          {/* Wishlist Items */}
          {wishlistItems.map((item) => (
            <div
              key={item._id}
              className="grid grid-cols-6 gap-4 items-center border-b py-4 hover:bg-gray-50 transition"
            >
              <div>
                <Link to={`/product/${item._id}`}>
                  <img
                    src={
                      item.image?.startsWith("http")
                        ? item.image
                        : `http://localhost:5000/${item.image}`
                    }
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </Link>
              </div>

              <div className="col-span-2">
                <Link to={`/product/${item._id}`}>
                  <h4 className="font-semibold text-gray-800">{item.name}</h4>
                </Link>
              </div>

              <div>₹{item.price}</div>

              <div className="text-green-600 font-medium">In Stock</div>

              <div className="flex flex-col md:flex-row gap-2">
                <button
                  className="text-sm text-blue-600 hover:underline"
                  onClick={() => {
                    addToCart(item);
                    toast.success("Added to cart");
                  }}
                >
                  Add to Cart
                </button>
                <button
                  className="text-sm text-red-500 hover:underline"
                  onClick={() => {
                    removeFromWishlist(item._id);
                    toast.info("Removed from wishlist");
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Wishlist;
