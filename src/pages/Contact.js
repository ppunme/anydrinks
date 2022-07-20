import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="container pt-4 text-center">
      <h3>Contact Us</h3>
      <p className="mt-3 mx-auto" style={{ maxWidth: "400px" }}>
        Feel free to contact us at anytime. We will get back to you as soon as
        we can!
      </p>
      <div className="card mb-5 mx-auto" style={{ maxWidth: "400px" }}>
        <div className="card-body py-4 text-white card-support">
          <h5 className="card-title mb-4">Customer support</h5>
          <p className="card-text mb-2">
            <a href="mailto:support@anydrinks.com" className="text-white">
              support@anydrinks.com
            </a>
          </p>
          <p className="card-text">+614 123 94222</p>
        </div>
      </div>

      <div className="geo-icon mx-auto">
        <i className="bi bi-geo-alt-fill"></i>
      </div>
      <div className="card border-0 mb-5 mx-auto" style={{ maxWidth: "400px" }}>
        <div className="card-body">
          <h5 className="card-title mb-4">Contact Address</h5>
          <p className="card-text mb-2">133 Bourke Street,</p>
          <p className="card-text">Melbourne, VIC 3000</p>
        </div>
      </div>
      <div className="mb-5">
        <h3>Get in touch on social media</h3>
        <div className="list-inline">
          <li className="list-inline-item p-2">
            <a href="https://www.twitter.com">
              <i className="bi bi-twitter"></i>
            </a>
          </li>
          <li className="list-inline-item p-2">
            <a href="https://www.facebook.com">
              <i className="bi bi-facebook"></i>
            </a>
          </li>
          <li className="list-inline-item p-2">
            <a href="https://www.linkedin.com">
              <i className="bi bi-linkedin"></i>
            </a>
          </li>
        </div>
      </div>
    </div>
  );
};

export default Contact;
