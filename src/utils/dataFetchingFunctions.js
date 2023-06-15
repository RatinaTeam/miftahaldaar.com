// Base URL

import axios from "axios";

const baseUrl = "https://miftahaldaar.ratina.co/";

/****************************************************************
 *********** USERS
 ***************************************************************/
export const getAllUsers = async (userID, authKey) => {
    const headers = {
        "user-id": userID,
        "auth-key": authKey,
    };
    const users = await axios.get(baseUrl + "user/all", { headers });
    return users;
};

export const addNewUser = async (formData, headers) => {
    const newUser = await axios.post(baseUrl + "user/create", formData, { headers });
    return newUser;
};

/****************************************************************
 *********** Authentication
 ***************************************************************/
export const signIn = async (formData,uid) => {
    console.log("1");
    const newUser = await axios.post(baseUrl + "user/login", formData);
    console.log("2");
    localStorage.setItem("userID",uid);
    localStorage.setItem("authKey",newUser.data.auth_key);
    console.log(newUser.data.auth_key);
    console.log(localStorage.getItem("authKey"));
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
