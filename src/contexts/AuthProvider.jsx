import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // States
  const [isLoading, setIsLoading] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);
  const [isSignedInAlready, setIsSignedInAlready] = useState(
    localStorage.getItem("isSignedInAlready") === "true"
  );
  const [userID, setUserID] = useState(localStorage.getItem("userID"));
  const [authKey, setAuthKey] = useState(localStorage.getItem("authKey"));
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));
  // const [searchQuery, setSearchQuery] = useState({});

  const who = {
    ADMIN: 1,
    SUPERVISOR: 2,
    EMPLOYEE: 3,
  };

  useEffect(() => {
    localStorage.setItem("isSignedInAlready", isSignedInAlready);
  }, [isSignedInAlready]);

  useEffect(() => {
    localStorage.setItem("userID", userID);
  }, [userID]);

  useEffect(() => {
    localStorage.setItem("authKey", authKey);
  }, [authKey]);

  useEffect(() => {
    localStorage.setItem("userRole", userRole);
  }, [userRole]);

  useEffect(() => {
    if (userID && authKey) {
      const headers = {
        "user-id": userID,
        "auth-key": authKey,
      };
      axios
        .get("https://miftahaldaar.ratina.co/user/all", { headers })
        .then((res) => {
          const usersList = res.data.users;
          const userInfo = usersList?.find((user) => user.id == userID);
          setLoggedUser(who[userInfo?.role]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userID, authKey]);

  const providerValue = {
    isSignedInAlready,
    userID,
    loggedUser,
    setUserID,
    setIsSignedInAlready,
    isLoading,
    setIsLoading,
    authKey,
    setAuthKey,
    userRole,
    setUserRole,
    // searchQuery,
    // setSearchQuery,
  };

  return (
    <AuthContext.Provider value={providerValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
