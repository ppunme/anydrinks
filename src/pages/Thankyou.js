import React, { useEffect } from "react";
import { useHistory } from "react-router";
import "./Checkout.css";

const Thankyou = () => {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.push("/anydrinks/products");
    }, 5000);
  });
  return (
    <div className="text-center mt-5">
      <div className="check-icon d-flex align-items-center justify-content-center mx-auto">
        <i className="bi bi-check d-flex align-items-center"></i>
      </div>
      <h1 className="mt-3">Thank you</h1>
      <p className="mb-2">Your order has been placed.</p>
      <p>We will notify you once your order has shipped.</p>
      <p className="text-muted">
        It will be redirected to home page shortly...
      </p>
    </div>
  );
};

export default Thankyou;
