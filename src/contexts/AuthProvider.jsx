import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    // States
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(true);

    const providerValue = {
        user,
        setUser,
        isLoading,
        setIsLoading,
    };

    return <AuthContext.Provider value={providerValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
