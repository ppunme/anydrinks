import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import {
  reauthenticateWithCredential,
  updatePassword,
  EmailAuthProvider,
} from "firebase/auth";
import "./ChangePassword.css";

const ChangePassword = () => {
  const currentPasswordRef = useRef("");
  const newPasswordRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, isLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [msg, setMsg] = useState(null);

  const history = useHistory();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleBack = () => {
    history.goBack();
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(
      user.email,
      currentPasswordRef.current.value
    );

    reauthenticateWithCredential(user, credential)
      .then(async () => {
        if (newPasswordRef.current.value) {
          try {
            isLoading(true);
            await updatePassword(user, newPasswordRef.current.value);
            isLoading(false);
            setSuccess(true);
            setMsg("Your password has been updated!");
          } catch (error) {
            let errorCode = error.code;
            setSuccess(false);
            if (errorCode === "auth/weak-password") {
              setMsg("Password must be at least 6 characters");
            } else {
              setMsg(errorCode);
            }
            isLoading(false);
          }
        }
      })
      .catch((error) => {
        console.log(error);
        setSuccess(false);
        setMsg("Current password did not match");
      });
  };

  return (
    <div className="account-content">
      <div onClick={handleBack} className="back-btn mb-3 d-block d-md-none">
        <i className="bi bi-chevron-left me-2"></i>
        Return to Account
      </div>
      <h4 className="account-title mb-3">Change Password</h4>
      <form className="s-form" onSubmit={handleUpdatePassword}>
        <div data-label="Current Password" className="s-input">
          <input
            ref={currentPasswordRef}
            placeholder="Current Password"
            type={showPassword ? "text" : "password"}
            className="form-control"
            required
          />
        </div>
        <div data-label="New Password" className="s-input">
          <input
            ref={newPasswordRef}
            placeholder="New Password"
            type={showPassword ? "text" : "password"}
            className="form-control"
            required
          />
          <button
            type="button"
            className="s-input-toggle s-text-link"
            onClick={togglePassword}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {success === true && (
          <div className="alert alert-success  mt-3" role="alert">
            {msg}
          </div>
        )}
        {success === false && (
          <div className="alert alert-danger  mt-3" role="alert">
            {msg}
          </div>
        )}
        <button type="submit" className="default-btn changepw-btn">
          {loading ? (
            <div
              className="spinner-border spinner-border-sm"
              role="status"
            ></div>
          ) : (
            "Change my password"
          )}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
