import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import logo from "../../assets/logo.png";

const ForgetPassword = () => {
  const emailRef = useRef(null);
  const [msg, setMsg] = useState(null);
  const [success, setSuccess] = useState(null);
  const history = useHistory();

  const handleBack = () => {
    history.goBack();
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      await sendPasswordResetEmail(auth, emailRef.current.value)
        .then(() => {
          setMsg("Password reset email was sent!");
          setSuccess(true);
        })
        .catch((error) => {
          const errorCode = error.code;
          setSuccess(false);

          if (errorCode === "auth/user-not-found") {
            setMsg("User not found");
          } else {
            setMsg(errorCode);
          }
        });
    } catch {
      console.log("Fail to reset password");
    }
  };

  return (
    <div className="px-3 py-5 mx-auto" style={{ maxWidth: "450px" }}>
      <Link to="/anydrinks" className="brand-logo mb-3">
        <img src={logo} alt="logo" />
      </Link>
      <p>
        Enter the email address associated with your account and we’ll send you
        a link to reset your password.
      </p>
      <form className="form-input mb-3" onSubmit={handleResetPassword}>
        <h6 className="mb-2">Email</h6>
        <input
          type="email"
          ref={emailRef}
          placeholder="Email Address"
          className="mb-3"
          required
        />
        {success === true && (
          <div className="alert alert-success" role="alert">
            {msg}
          </div>
        )}
        {success === false && (
          <div className="alert alert-danger" role="alert">
            {msg}
          </div>
        )}
        <button
          type="submit"
          className="default-btn"
          style={{ maxWidth: "180px" }}
        >
          Reset password
        </button>
      </form>
      <div onClick={handleBack} className="back-btn mt-3">
        <i className="bi bi-chevron-left me-2"></i>
        Back
      </div>
    </div>
  );
};

export default ForgetPassword;
