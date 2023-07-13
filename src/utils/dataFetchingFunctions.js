// Base URL

import axios from "axios";

const baseUrl = "https://srv.miftahaldaar.com";

/****************************************************************
 *********** USERS
 ***************************************************************/
export const getAllUsers = async (userID, authKey) => {
    const headers = {
        "user-id": userID,
        "auth-key": authKey,
    };
    const users = await axios.get(baseUrl + "/user/all", { headers });
    return users;
};

export const addNewUser = async (formData, headers) => {
    const newUser = await axios.post(baseUrl + "/user/create", formData, { headers });
    return newUser;
};

/****************************************************************
 *********** Authentication
 ***************************************************************/
export const signIn = async (formData,uid) => {
    const newUser = await axios.post(baseUrl + "/user/login", formData);
    localStorage.setItem("userID",uid);
    localStorage.setItem("authKey",newUser.data.auth_key);
    console.log('newUser.data.role',newUser.data.role)
    localStorage.setItem("userRole",newUser.data.role);
    return newUser.data;
};

/****************************************************************
 *********** Order
 ***************************************************************/

/****************************************************************
 *********** Orders
 ***************************************************************/

/****************************************************************
 *********** Order Status
 ***************************************************************/
