import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart, removeFromCart } = useCart();
  const [showPaymentSection, setShowPaymentSection] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("stripe");

  const subtotal = cart.reduce((total, item) => total + item.price, 0);
  const shippingFee = 30;
  const total = subtotal + shippingFee;

  const handleCheckoutClick = () => {
    setShowPaymentSection(true);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    alert(`Order placed with ${paymentMethod.toUpperCase()}`);
    // TODO: Handle order submission here
  };

  return (
    <section className="bg-gradient-to-r from-green-100 to-blue-200">
    <div className="max-w-7xl mx-auto p-6 bg-gradient-to-r from-green-200 to-blue-300">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between border p-4 rounded-md shadow hover:shadow-lg transition"
              >
                <div className="flex items-center gap-4">
                  <Link to={`/product/${item._id}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                  </Link>
                  <div>
                    <h4 className="text-lg font-semibold">{item.name}</h4>
                    <p className="text-gray-600">₹{item.price}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleCheckoutClick}
              className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 transition"
            >
              Checkout
            </button>
          </div>
        </>
      )}

      {showPaymentSection && (
        <div className="mt-12 border rounded-md p-6 shadow-lg bg-gradient-to-r from-green-100 to-blue-200">
          <h3 className="text-xl font-bold mb-4">Delivery Information</h3>
          <form onSubmit={handlePlaceOrder} className="space-y-4">
            {/* Delivery Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input placeholder="First Name" className="border p-3 rounded" required />
              <input placeholder="Last Name" className="border p-3 rounded" required />
              <input type="email" placeholder="Email Address" className="border p-3 rounded" required />
              <input placeholder="Street" className="border p-3 rounded" required />
              <input placeholder="City" className="border p-3 rounded" required />
              <input placeholder="State" className="border p-3 rounded" required />
              <input placeholder="Zipcode" className="border p-3 rounded" required />
              <input placeholder="Country" className="border p-3 rounded" required />
              <input placeholder="Phone" className="border p-3 rounded md:col-span-2" required />
            </div>

            {/* Cart Totals */}
            <div className="mt-6 border-t pt-4">
              <h4 className="text-lg font-semibold mb-2">Cart Totals</h4>
              <div className="space-y-1 text-gray-700">
                <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
                <p>Shipping Fee: ₹{shippingFee.toFixed(2)}</p>
                <p className="font-bold text-lg">Total: ₹{total.toFixed(2)}</p>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mt-6 border-t pt-4">
              <h4 className="text-lg font-semibold mb-2">Payment Method</h4>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value="stripe"
                    checked={paymentMethod === "stripe"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Stripe
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value="razorpay"
                    checked={paymentMethod === "razorpay"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Razorpay
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Cash on Delivery
                </label>
              </div>
            </div>

            {/* Place Order */}
            <div className="mt-6 flex justify-center">
              <button
                type="submit"
                className="bg-green-600 text-white px-8 py-3 rounded-md shadow hover:bg-green-700 transition"
              >
                Place Order
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
    </section>
  );
};

export default CartPage;
