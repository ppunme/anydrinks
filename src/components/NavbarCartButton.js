import React, { Fragment } from "react";
import "./NavbarCartButton.css";

const NavbarCartButton = (props) => {
  return (
    <Fragment>
      <div
        className="position-relative cart-icon"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      >
        <i className="bi bi-bag"></i>
        <span className="position-absolute translate-middle cart-amount-badge">
          {props.cartItemNumber}
        </span>
      </div>
    </Fragment>
  );
};

export default NavbarCartButton;
