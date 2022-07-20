import React, { useState, useEffect, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../firebase";
import { doc, setDoc, getFirestore } from "firebase/firestore";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const db = getFirestore();

  async function signup(email, password) {
    const newUser = await createUserWithEmailAndPassword(auth, email, password);

    // Store user id in firestore for storing user details
    const userId = newUser.user.uid;
    setDoc(doc(db, "userdetails", userId), {});
    return newUser;
  }

  async function login(email, password) {
    return await signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    console.log("Logout successful");
    return signOut(auth);
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
