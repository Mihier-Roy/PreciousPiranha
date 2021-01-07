import axios from "axios";
import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS
} from "../constants/userConstants";

export const userLogin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_LOGIN_REQUEST });

    try {
        // Make a request to the user login endpoint to retrieve the user token
        const { data } = await axios.post(
            `/api/users/login`,
            { email, password },
            { headers: { "Content-Type": "application/json" } }
        );

        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

        // Save token to local storage.
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};
