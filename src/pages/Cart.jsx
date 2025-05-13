import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [showPaymentSection, setShowPaymentSection] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("razorpay");

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingFee = 30;
  const total = subtotal + shippingFee;

  const handleCheckoutClick = () => {
    setShowPaymentSection(true);
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
  
    // 🔥 Create order from backend first
    const orderRes = await fetch("http://localhost:5000/api/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ totalAmount: total }),
    });
  
    const data = await orderRes.json();
  
    if (!data.success) {
      alert("Failed to create order.");
      return;
    }
  
    const options = {
      key: "YOUR_RAZORPAY_KEY_ID",
      amount: data.order.amount,
      currency: data.order.currency,
      name: "Excellup Coaching",
      description: "Course Purchase",
      image: "/logo.png",
      order_id: data.order.id, // from backend
      handler: function (response) {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        // TODO: Store order in backend
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#00b894",
      },
      method: {
        upi: true,
        netbanking: false,
        card: false,
      },
    };
  
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (paymentMethod === "razorpay") {
      await handleRazorpayPayment();
    } else if (paymentMethod === "stripe") {
      alert("Stripe integration not yet implemented.");
    } else if (paymentMethod === "cod") {
      alert("Order placed with Cash on Delivery!");
      // TODO: Save COD order to database
    }
  };

  return (
    <section className="bg-gradient-to-r from-green-100 to-blue-200 min-h-screen">
      <div className="max-w-7xl mx-auto p-6 bg-white rounded-md shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            <div className="grid grid-cols-6 gap-4 px-4 py-2 font-semibold text-gray-700 border-b">
              <div>Product</div>
              <div className="col-span-2">Name</div>
              <div>Quantity</div>
              <div>Price</div>
              <div>Action</div>
            </div>

            <div className="space-y-4 mt-2">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="grid grid-cols-6 gap-4 items-center border p-4 rounded-md shadow bg-white"
                >
                  <div className="col-span-1">
                    <Link to={`/product/${item._id}`}>
                      <img
                        src={
                          item.image?.startsWith("http")
                            ? item.image
                            : `http://localhost:5000/${item.image}`
                        }
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                    </Link>
                  </div>
                  <div className="col-span-2">
                    <h4 className="text-lg font-semibold">{item.name}</h4>
                    <p className="text-gray-600">₹{item.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="px-3 py-1 border rounded disabled:opacity-50"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="px-3 py-1 border rounded"
                    >
                      +
                    </button>
                  </div>
                  <div className="font-medium text-gray-700">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </div>
                  <div>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
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

              <div className="mt-6 border-t pt-4">
                <h4 className="text-lg font-semibold mb-2">Cart Totals</h4>
                <div className="space-y-1 text-gray-700">
                  <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
                  <p>Shipping Fee: ₹{shippingFee.toFixed(2)}</p>
                  <p className="font-bold text-lg">Total: ₹{total.toFixed(2)}</p>
                </div>
              </div>

              <div className="mt-6 border-t pt-4">
                <h4 className="text-lg font-semibold mb-2">Payment Method</h4>
                <div className="space-y-2">
                  {["razorpay", "stripe", "cod"].map((method) => (
                    <label key={method} className="flex items-center gap-2 capitalize">
                      <input
                        type="radio"
                        name="payment"
                        value={method}
                        checked={paymentMethod === method}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      {method === "cod" ? "Cash on Delivery" : method}
                    </label>
                  ))}
                </div>
              </div>

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
