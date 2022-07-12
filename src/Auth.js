import React, { useEffect, useState } from "react";
import app from "./firebase/index";
import "./App.css";
import { useHistory } from "react-router-dom";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);
  const history = useHistory();

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);
    });
  }, []);

  if (pending) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        history,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
