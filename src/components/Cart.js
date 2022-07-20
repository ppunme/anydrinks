import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "./store/CartContext";
import "./Cart.css";

const Cart = () => {
  const cartContext = useContext(CartContext);

  const cartList = (
    <Fragment>
      {cartContext.cart.length <= 0 && (
        <h6 className="text-center">No Item in the Cart!</h6>
      )}
      {cartContext.cart.map((cartItem) => (
        <div className="row cart-product" key={cartItem.id}>
          <div className="col-4 ps-0">
            <img
              src={cartItem.img}
              className="card-img-top"
              alt={cartItem.title}
            ></img>
          </div>

          <div className="col-8 py-1">
            <button className="remove-btn">
              <i
                className="bi bi-x remove-icon"
                onClick={cartContext.deleteItemFromCart.bind(this, cartItem.id)}
              ></i>
            </button>
            <Link
              to={`/anydrinks/products/${cartItem.id}`}
              data-bs-dismiss="offcanvas"
            >
              <p className="item-title">{cartItem.title}</p>
            </Link>
            <p className="item-desc overflow-hidden">{cartItem.desc}</p>
            <div className="d-flex justify-content-between">
              <div className="item-quantity">
                <label>Quantity</label>
                <div className="quantity-wrapper">
                  <button
                    data-action="decrement"
                    className="d-flex align-items-center justify-content-center quantity-btn"
                    onClick={cartContext.removeItemFromCart.bind(
                      this,
                      cartItem.id
                    )}
                  >
                    <span>−</span>
                  </button>
                  <span
                    type="number"
                    className="d-flex align-items-center justify-content-center quantity-number"
                  >
                    {cartItem.quantity}
                  </span>
                  <button
                    data-action="increment"
                    className="d-flex align-items-center justify-content-center quantity-btn"
                    onClick={cartContext.addItemToCart.bind(this, cartItem)}
                  >
                    <span>+</span>
                  </button>
                </div>
              </div>
              <div className="d-flex align-items-end pb-1 small">
                <span>$</span>
                <span>{cartItem.amount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Fragment>
  );

  return (
    <div
      className="offcanvas offcanvas-end"
      data-bs-scroll="true"
      tabIndex="-1"
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header">
        <h5 id="offcanvasRightLabel" className="cart-title mb-0">
          My Cart
        </h5>
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body pt-0">
        <div className="cart-list">{cartList}</div>
        <div className="cart-details">
          {cartContext.cart.length > 0 && (
            <>
              <div className="row py-2">
                <div className="col-4">Subtotal:</div>
                <div className="col-8 text-end">
                  <span>$</span>
                  <span>{cartContext.totalAmount.toFixed(2)}</span>
                </div>
              </div>
              <div className="row py-2">
                <div className="col-4">Shipping:</div>
                <div className="col-8 text-end">Free</div>
              </div>
              <div className="row py-2 fw-bolder">
                <div className="col-4">Total:</div>
                <div className="col-8 text-end">
                  <span>$</span>
                  <span>{cartContext.totalAmount.toFixed(2)}</span>
                </div>
              </div>
              <Link to={`/anydrinks/checkout`}>
                <button
                  type="submit"
                  className="default-btn button w-100"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                >
                  Go to Checkout
                </button>
              </Link>
            </>
          )}
          <Link
            to={`/anydrinks/products`}
            className="continue-link text-center"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
