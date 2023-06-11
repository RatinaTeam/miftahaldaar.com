import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    // States
    const [isLoading, setIsLoading] = useState(false);
    const [loggedUser, setLoggedUser] = useState(null);
    const [isSignedInAlready, setIsSignedInAlready] = useState(localStorage.getItem('isSignedInAlready') === 'true');
    const [userID, setUserID] = useState(localStorage.getItem('userID'));

    const who = {
        "ADMIN":1,
        "SUPERVISOR": 2,
        "EMPLOYEE": 3,
    }

    useEffect(() => {
        localStorage.setItem('isSignedInAlready', isSignedInAlready);

    }, [isSignedInAlready]);
    
    useEffect(() => { 
        localStorage.setItem('userID', userID);
        const headers = {
            "user-id": userID,
            "auth-key": "sdofmasdmfasdmflkmasdf",
        };
        
        axios.get("https://miftahaldaar.ratina.co/user/all",
          
            { headers }).then((res) => {
            const usersList = res.data.users;
            const userInfo = usersList?.filter((user) => {
                    return user.id == userID;
            })[0];
            setLoggedUser(who[userInfo?.role]);
         

                
       }).catch((err) => {
           console.log(err);
       })
       
    }, [userID]);


    const providerValue = {
        isSignedInAlready,
        userID,
        loggedUser,
        setUserID,
        setIsSignedInAlready,
        isLoading,
        setIsLoading,
    };

    return <AuthContext.Provider value={providerValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
