import React, { useContext } from "react";
import { useHistory } from "react-router";
import { useAuth } from "./store/AuthContext";
import NavbarCartButton from "./NavbarCartButton";
import Cart from "./Cart";
import CartContext from "./store/CartContext";
import "./Navbar.css";

const Navbar = (props) => {
  const { currentUser, logout } = useAuth();
  const cartContext = useContext(CartContext);
  const history = useHistory();

  let Link = props.Link;

  const handleLogout = async () => {
    try {
      await logout();
      history.push("/anydrinks/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-light fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/anydrinks">
          AnyDrinks
        </Link>
        <Cart />
        {/* Mobile size */}
        <div className="d-flex ms-auto align-items-center">
          <div className="d-sm-none me-2">
            <NavbarCartButton
              cartItemNumber={cartContext.cart.reduce((count, currentItem) => {
                return count + currentItem.quantity;
              }, 0)}
            />
          </div>
          <div className="d-sm-none">
            {!currentUser && (
              <Link
                className="nav-link"
                aria-current="page"
                to="/anydrinks/login"
              >
                <i className="bi bi-person"></i>
              </Link>
            )}
            {currentUser && (
              <>
                <Link
                  className="btn btn-account"
                  type="button"
                  to="/anydrinks/account"
                >
                  <i className="bi bi-person"></i>
                </Link>
              </>
            )}
          </div>
          <button
            className="navbar-toggler ms-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarMain"
            aria-controls="navbarMain"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        {/* Desktop size */}
        <div className="collapse navbar-collapse" id="navbarMain">
          <div className="ms-auto">
            <ul className="nav navbar-nav">
              <Link
                className="nav-link menu-item"
                to="/anydrinks"
                aria-current="page"
              >
                Home
              </Link>
              <Link
                className="nav-link menu-item"
                to="/anydrinks/products"
                aria-current="page"
              >
                Products
              </Link>
              <Link
                className="nav-link menu-item"
                to="/anydrinks/contact"
                aria-current="page"
              >
                Contact Us
              </Link>
              <div className="d-none d-sm-block">
                <NavbarCartButton
                  cartItemNumber={cartContext.cart.reduce(
                    (count, currentItem) => {
                      return count + currentItem.quantity;
                    },
                    0
                  )}
                />
              </div>
              <div className="d-none d-sm-block">
                {!currentUser && (
                  <Link
                    className="nav-link"
                    aria-current="page"
                    to="/anydrinks/login"
                  >
                    <i className="bi bi-person"></i>
                  </Link>
                )}
                {currentUser && (
                  <>
                    <div className="dropdown">
                      <button
                        className="btn btn-account"
                        type="button"
                        id="accountMenu"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="bi bi-person"></i>
                      </button>
                      <ul
                        className="dropdown-menu dropdown-menu-end"
                        aria-labelledby="accountMenu"
                      >
                        <i className="caret"></i>
                        <li>
                          <Link
                            className="dropdown-item"
                            type="button"
                            to="/anydrinks/account"
                          >
                            My account
                          </Link>
                        </li>
                        <li>
                          <div
                            className="btn dropdown-item"
                            onClick={handleLogout}
                          >
                            Logout
                          </div>
                        </li>
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
