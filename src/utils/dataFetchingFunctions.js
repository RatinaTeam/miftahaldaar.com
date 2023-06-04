// Base URL

import axios from "axios";

const baseUrl = "https://miftahaldaar.ratina.co/";

/****************************************************************
 *********** USERS
 ***************************************************************/
export const getAllUsers = async () => {
    const headers = {
        "user-id": "1010",
        "auth-key": "sdofmasdmfasdmflkmasdf",
    };
    const users = await axios.get(baseUrl + "user/all", { headers });
    return users;
};

export const addNewUser = async (formData, headers) => {
    const newUser = await axios.post(baseUrl + "user/create", formData, { headers });
    return newUser;
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
