import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    // States
    const [isLoading, setIsLoading] = useState(false);
    const [isSignedInAlready, setIsSignedInAlready]  = useState(localStorage.getItem('isSignedInAlready') === 'true');

    useEffect(() => {
        localStorage.setItem('isSignedInAlready', isSignedInAlready);
      }, [isSignedInAlready]);
    

    const providerValue = {
        isSignedInAlready,
        setIsSignedInAlready,
        isLoading,
        setIsLoading,
    };

    return <AuthContext.Provider value={providerValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
