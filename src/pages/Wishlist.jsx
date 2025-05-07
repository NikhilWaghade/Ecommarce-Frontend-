// src/pages/Wishlist.js
import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <p>No items in wishlist.</p>
      ) : (
        wishlistItems.map((item) => (
          <div key={item._id} className="flex items-center justify-between border-b py-2">
            <div>
              <h4 className="font-semibold">{item.name}</h4>
              <p>${item.price}</p>
            </div>
            <div className="flex gap-2">
              <button
                className="btn-sm text-green-600"
                onClick={() => {
                  addToCart(item);
                  toast.success("Added to cart");
                }}
              >
                Add to Cart
              </button>
              <button
                className="text-red-500 text-sm"
                onClick={() => {
                  removeFromWishlist(item._id);
                  toast.info("Removed from wishlist");
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Wishlist;
