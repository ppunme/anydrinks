import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
import logo from "../../assets/logo.png";

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, isLoading] = useState(false);
  const history = useHistory();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      isLoading(true);

      // authenticating with firebase - using email and password
      await signup(emailRef.current.value, passwordRef.current.value);
      isLoading(false);
      setError(null);
      setTimeout(() => {
        history.push("/anydrinks/account");
      }, 3000);
    } catch (error) {
      isLoading(false);
      let errorCode = error.code;
      if (errorCode === "auth/email-already-in-use") {
        setError("Email is already exist");
      } else if (errorCode === "auth/weak-password") {
        setError("Password must be at least 6 characters");
      } else {
        setError("Failed to signup");
      }
    }
  };

  return (
    <div className="px-3 py-5 mx-auto" style={{ maxWidth: "450px" }}>
      <Link to="/anydrinks" className="brand-logo mb-3">
        <img src={logo} alt="logo" />
      </Link>
      <form onSubmit={handleSignup}>
        <div className="form-input mt-4">
          <h6 className="mb-1">Email</h6>
          <input
            id="input-email"
            type="email"
            ref={emailRef}
            placeholder="Email Address"
            required
          ></input>
          <h6 className="mt-3 mb-1">Password</h6>
          <input
            id="input-password"
            type="password"
            ref={passwordRef}
            placeholder="Password"
            className="mb-3"
            required
          ></input>
        </div>
        {error === null && (
          <div className="alert alert-success" role="alert">
            Sign up successful!
          </div>
        )}
        {error && (
          <div className="alert alert-danger" role="alert">
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
            "Sign up"
          )}
        </button>
        <div className="mt-3">
          Already have an account?{" "}
          <Link to="/anydrinks/login">
            <u>Log in</u>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
