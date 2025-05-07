import React, { useEffect, useState } from "react";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

// Load publishable key
const stripePromise = loadStripe("pk_test_xxxxxxxxxxxxx"); // Replace with your key

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent
    axios
      .post("/api/payment/create-payment-intent", { amount })
      .then((res) => setClientSecret(res.data.clientSecret))
      .catch((err) => console.error(err));
  }, [amount]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) return;

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/payment-success", // After payment
      },
    });

    if (result.error) {
      console.error(result.error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="p-3 border border-gray-300 rounded" />
      <button
        type="submit"
        disabled={!stripe || !clientSecret}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        Pay Now
      </button>
    </form>
  );
};

const StripeCheckout = ({ amount }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm amount={amount} />
    </Elements>
  );
};

export default StripeCheckout;
