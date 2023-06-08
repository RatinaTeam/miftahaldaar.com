import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    // States
    const [isLoading, setIsLoading] = useState(false);
    const [isSignedInAlready, setIsSignedInAlready] = useState(localStorage.getItem('isSignedInAlready') === 'true');
    const [userID , setUserID] = useState(localStorage.getItem('userID'));
    console.log(userID)
    useEffect(() => {
        localStorage.setItem('isSignedInAlready', isSignedInAlready);
    }, [isSignedInAlready]);
    
    useEffect(() => { 
        localStorage.setItem('userID', userID);
    }, [userID]);
    

    const providerValue = {
        isSignedInAlready,
        userID,
        setUserID,
        setIsSignedInAlready,
        isLoading,
        setIsLoading,
    };

    return <AuthContext.Provider value={providerValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
