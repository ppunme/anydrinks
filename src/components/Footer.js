import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="row">
        <div className="col-12 col-sm-6 col-md-4 mb-3">
          <div>
            <Link to="/anydrinks/">
              <h2 className="text-white mb-3">AnyDrinks</h2>
            </Link>
          </div>
          <div className="list-inline social-buttons mb-1">
            <li className="list-inline-item">
              <a href="https://www.twitter.com">
                <i className="bi bi-twitter"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="https://www.facebook.com">
                <i className="bi bi-facebook"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="https://www.linkedin.com">
                <i className="bi bi-linkedin"></i>
              </a>
            </li>
          </div>
          <small className="text-muted">&copy; AnyDrinks 2021</small>
        </div>

        <div className="col-12 col-sm-6 col-md-4 mb-3">
          <div className="footer-title">Quicklinks</div>
          <div className="d-flex flex-column pt-2">
            <p className="mb-1">About us</p>
            <p className="mb-1">Shipping information</p>
            <p className="mb-1">Return and exchange</p>
            <Link to="/anydrinks/contact" className="quicklinks-items mb-1">
              Contact
            </Link>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="footer-title">Stay in touch!</div>
          <div className="pt-2">
            Sign up to our newsletters and get a 15% OFF for your first order
          </div>
          <div className="subscribe-form mt-2">
            <input
              type="text"
              id="subemail"
              name="subemail"
              placeholder="Email"
              required
            />
            <button className="subscribe__btn mt-2">Subscribe</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
