import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../../components/store/AuthContext";
import { doc, getDoc, updateDoc, getFirestore } from "firebase/firestore";
import "./Account.css";

const Profile = () => {
  const fnameRef = useRef(null);
  const lnameRef = useRef(null);
  const phoneRef = useRef(null);

  const { currentUser } = useAuth();
  const [userDetails, setUserDetails] = useState("");
  const [error, setError] = useState("");
  const [loading, isLoading] = useState(false);

  const db = getFirestore();
  const history = useHistory();

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

  // Update user details
  const handleUpdateDetails = async (e) => {
    e.preventDefault();
    try {
      setError("");
      isLoading(true);
      const washingtonRef = doc(db, "userdetails", currentUser.uid);

      await updateDoc(washingtonRef, {
        fname: fnameRef.current.value,
        lname: lnameRef.current.value,
        phone: phoneRef.current.value,
      });
      isLoading(false);
    } catch {
      isLoading(false);
      setError("Failed to update");
    }
  };

  const handleBack = () => {
    history.goBack();
  };

  return (
    <div className="account-content">
      <div onClick={handleBack} className="back-btn d-block d-md-none mb-3">
        <i className="bi bi-chevron-left me-2"></i>
        Return to Account
      </div>
      <h4 className="account-title mb-3">Profile</h4>
      <form className="s-form">
        <h6>Email Address</h6>
        <p>{currentUser.email}</p>
        <h6>First Name</h6>
        <div className="s-input">
          <input
            id="input-fname"
            type="text"
            className="form-control"
            placeholder="First name"
            ref={fnameRef}
            defaultValue={userDetails.fname}
          />
        </div>
        <h6>Last Name</h6>
        <div className="s-input">
          <input
            id="input-lname"
            type="text"
            className="form-control"
            placeholder="Last Name"
            ref={lnameRef}
            defaultValue={userDetails.lname}
          />
        </div>
        <h6>Phone number</h6>
        <div className="s-input">
          <input
            id="input-phone"
            type="text"
            className="form-control"
            placeholder="Phone number"
            ref={phoneRef}
            defaultValue={userDetails.phone}
          />
        </div>
      </form>

      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      )}
      <button className="default-btn update-btn" onClick={handleUpdateDetails}>
        {loading ? (
          <div className="spinner-border spinner-border-sm" role="status"></div>
        ) : (
          "Update"
        )}
      </button>
    </div>
  );
};

export default Profile;
