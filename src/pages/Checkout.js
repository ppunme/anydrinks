import React, {
  Fragment,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";
import CartContext from "../components/store/CartContext";
import { useAuth } from "../components/store/AuthContext";
import {
  doc,
  getDoc,
  addDoc,
  collection,
  getFirestore,
} from "firebase/firestore";
import { useHistory } from "react-router";
import { uid } from "uid";
import "./Checkout.css";

const Checkout = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const fNameRef = useRef(null);
  const lNameRef = useRef(null);
  const streetRef = useRef(null);
  const stateRef = useRef(null);
  const cityRef = useRef(null);
  const postcodeRef = useRef(null);

  const cartContext = useContext(CartContext);
  const orderDetails = cartContext.cart;
  const { login, currentUser } = useAuth();
  const [userDetails, setUserDetails] = useState("");
  const history = useHistory();
  const db = getFirestore();

  const [loading, isLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      const db = getFirestore();
      if (currentUser) {
        // Get user details
        const docRef = doc(db, "userdetails", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        } else {
          console.log("No user details");
        }
      }
    })();
  }, [currentUser]);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    try {
      // Add a new document with auto-generated id
      await addDoc(collection(db, "orders"), {
        orderDetails,
        orderId: uid(6),
        userId: currentUser.uid,
        totalAmount: cartContext.totalAmount,
        orderDate: Date.now(),
        fName: fNameRef.current.value,
        lName: lNameRef.current.value,
        street: streetRef.current.value,
        state: stateRef.current.value,
        city: cityRef.current.value,
        postcode: postcodeRef.current.value,
      });
      // Reset cart after submit
      cartContext.resetCart();
      history.push("/anydrinks/thankyou");
    } catch (error) {
      setError("Fail to checkout");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      isLoading(true);
      // authenticating with firebase - using email and password
      await login(emailRef.current.value, passwordRef.current.value);
      setError("");
      isLoading(false);
    } catch (error) {
      isLoading(false);
      if (error.code === "auth/wrong-password") {
        setError("Failed to log in");
      }
      if (error.code === "auth/user-not-found") {
        setError("User not found");
      }
    }
  };

  const cartList = (
    <Fragment>
      {error}
      {cartContext.cart.map((cartItem) => (
        <div className="row mx-0 cart-item" key={cartItem.id}>
          <div className="col-4 ps-0">
            <img
              src={cartItem.img}
              className="card-img-top"
              alt={cartItem.title}
            ></img>
          </div>

          <div className="col-8 cart-details-checkout">
            <button className="remove-btn">
              <i
                className="bi bi-x remove-icon"
                onClick={cartContext.deleteItemFromCart.bind(this, cartItem.id)}
              ></i>
            </button>
            <p className="item-title">{cartItem.title}</p>
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
              <div className="d-flex align-items-end pb-1">
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
    <div className="container-fluid py-3">
      <h1 className="text-center py-4">Checkout</h1>

      <div className="row">
        <div className="col-12 col-sm-6 col-lg-4 mb-3">{cartList}</div>
        <div className="col-12 col-sm-6 col-lg-4">
          {!currentUser && (
            <>
              <div className="login-form-section mb-4">
                <h5>Please log in to continue</h5>
                <form onSubmit={handleLogin}>
                  <div className="form-input mb-3">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email Address"
                      ref={emailRef}
                      required
                    />
                  </div>
                  <div className="form-input mb-3">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Password"
                      ref={passwordRef}
                      required
                    />
                  </div>

                  {error && (
                    <div className="alert alert-danger mt-3" role="alert">
                      {error}
                    </div>
                  )}

                  <button type="submit" className="default-btn w-100">
                    {loading ? (
                      <div
                        className="spinner-border spinner-border-sm"
                        role="status"
                      ></div>
                    ) : (
                      "Log In"
                    )}
                  </button>
                </form>
              </div>
            </>
          )}

          {currentUser && (
            <>
              <div className="contact-info-section">
                <h5>Contact information</h5>
                <form>
                  <div className="form-floating mb-3 form-input">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingFName"
                      placeholder="First Name"
                      ref={fNameRef}
                      defaultValue={userDetails.fname}
                    />
                    <label htmlFor="floatingFName">First Name</label>
                  </div>
                  <div className="form-floating mb-3 form-input">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingLName"
                      placeholder="Last Name"
                      ref={lNameRef}
                      defaultValue={userDetails.lname}
                    />
                    <label htmlFor="floatingLName">Last Name</label>
                  </div>
                  <div className="form-floating form-input">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingEmail"
                      placeholder="Email"
                      defaultValue={currentUser.email}
                    />
                    <label htmlFor="floatingEmail">Email</label>
                  </div>
                </form>
                <div className="form-input my-4">
                  <h5>Delivery Address</h5>
                  <form>
                    <div className="form-floating mb-3 form-input">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingStreet"
                        placeholder="Street"
                        ref={streetRef}
                        required
                      />
                      <label htmlFor="floatingStreet">Street</label>
                    </div>

                    <div className="form-floating mb-3 form-input">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingCity"
                        placeholder="City"
                        ref={cityRef}
                        required
                      />
                      <label htmlFor="floatingCity">City</label>
                    </div>
                    <div className="form-floating mb-3 form-input">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingState"
                        placeholder="State"
                        ref={stateRef}
                        required
                      />
                      <label htmlFor="floatingState">State</label>
                    </div>
                    <div className="form-floating form-input">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingPostcode"
                        placeholder="Postcode"
                        ref={postcodeRef}
                        required
                      />
                      <label htmlFor="floatingPostcode">Postcode</label>
                    </div>
                  </form>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="col-12 col-sm-8 col-lg-4">
          <h5>Payment</h5>
          <div className="order-summary-section p-4 mb-3">
            <h5>Order Summary</h5>
            <div className="d-flex mt-3">
              <p>{cartContext.cart.length} items</p>
              <p className="ms-auto">$ {cartContext.totalAmount.toFixed(2)}</p>
            </div>
            <div className="d-flex">
              <p>Delivery fee</p>
              <p className="ms-auto">Free</p>
            </div>
            <div className="d-flex">
              <p>Total</p>
              <p className="ms-auto">$ {cartContext.totalAmount.toFixed(2)}</p>
            </div>
          </div>
          {cartContext.cart && (
            <button className="default-btn w-100" onClick={handlePlaceOrder}>
              Place order
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
