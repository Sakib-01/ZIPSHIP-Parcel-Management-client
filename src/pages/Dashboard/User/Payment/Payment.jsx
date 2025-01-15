import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import CheckoutForm from "./CheckoutForm";
import { useLocation } from "react-router-dom";

const Payment = () => {
  const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
  const location = useLocation();
  const { parcel } = location.state || {};
  console.log(location);
  console.log(parcel);
  return (
    <div>
      <h2>payment</h2>

      <Elements stripe={stripePromise}>
        <CheckoutForm parcel={parcel} />
      </Elements>
    </div>
  );
};

export default Payment;
