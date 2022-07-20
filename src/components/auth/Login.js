import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
import logo from "../../assets/logo.png";
import "./Login.css";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, isLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      isLoading(true);

      // authenticating with firebase - using email and password
      await login(emailRef.current.value, passwordRef.current.value);
      isLoading(false);
      setError(null);
      history.push("/anydrinks/account");
    } catch (error) {
      isLoading(false);
      setError("Incorrect email or passwords");
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="px-3 py-5 mx-auto" style={{ maxWidth: "450px" }}>
      <Link to="/anydrinks" className="brand-logo mb-3">
        <img src={logo} alt="logo" />
      </Link>
      <form onSubmit={handleLogin}>
        <div className="form-input mt-4 mb-2">
          <h6 className="mb-1">Email</h6>
          <input
            id="input-email"
            ref={emailRef}
            type="email"
            placeholder="Email Address"
            required
          ></input>
          <h6 className="mt-3 mb-1">Password</h6>
          <div className="input-icon-container mb-3">
            <input
              id="input-password"
              ref={passwordRef}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
            ></input>
            <i
              onClick={togglePassword}
              className={
                showPassword ? "bi bi-eye-slash-fill" : "bi bi-eye-fill"
              }
            ></i>
          </div>
        </div>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <Link to="/anydrinks/forgetpassword">Forget Password?</Link>
        <button type="submit" className="default-btn w-100 mt-3">
          {loading ? (
            <div
              className="spinner-border spinner-border-sm"
              role="status"
            ></div>
          ) : (
            "Log In"
          )}
        </button>
        <div className="mt-3">
          Don't have an account?{" "}
          <Link to="/anydrinks/signup">
            <u>Create an account</u>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
