import axios from "axios";
import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_CLEAR,
    USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_FAIL
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
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

export const logout = () => (disptach) => {
    disptach({ type: USER_LOGOUT });

    localStorage.removeItem("userInfo");
};

export const register = (name, email, password) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST });

    try {
        // Make a request to the registeration endpoint to register the user and retrieve a token
        const { data } = await axios.post(
            `/api/users`,
            { name, email, password },
            { headers: { "Content-Type": "application/json" } }
        );

        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

        // Save token to local storage.
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};

export const clearRegisterState = () => (dispatch) => {
    dispatch({ type: USER_REGISTER_CLEAR });
};

export const getDetails = () => async (dispatch, getState) => {
    dispatch({ type: USER_PROFILE_REQUEST });

    try {
        // Make a PUT request to the profiles endpint to update user information
        const { data } = await axios.get(`/api/users/profile`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getState().userLogin.userInfo.token}`
            }
        });

        dispatch({ type: USER_PROFILE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: USER_PROFILE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};
