import axios from "axios";
import { ORDER_USER_LIST_RESET } from "../constants/orderConstants";
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
    USER_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_CLEAR,
    USER_PROFILE_RESET,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_CLEAR,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_ADMIN_UPDATE_REQUEST,
    USER_ADMIN_UPDATE_SUCCESS,
    USER_ADMIN_UPDATE_FAIL,
    USER_ADMIN_DETAILS_REQUEST,
    USER_ADMIN_DETAILS_SUCCESS,
    USER_ADMIN_DETAILS_FAIL
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
    disptach({ type: USER_PROFILE_RESET });
    disptach({ type: ORDER_USER_LIST_RESET });
    disptach({ type: USER_LIST_CLEAR });

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
        // Make a GEt request to the profiles endpint to fetch user information
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

export const updateDetails = (user) => async (dispatch, getState) => {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

    try {
        // Make a PUT request to the profiles endpint to update user information
        const { data } = await axios.put(`/api/users/profile`, user, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getState().userLogin.userInfo.token}`
            }
        });
        dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};

export const resetUpdateProfile = () => (dispatch) => {
    dispatch({ type: USER_UPDATE_PROFILE_CLEAR });
};

export const getAllUsers = () => async (dispatch, getState) => {
    dispatch({ type: USER_LIST_REQUEST });

    try {
        const { data } = await axios.get(`/api/users`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getState().userLogin.userInfo.token}`
            }
        });
        dispatch({ type: USER_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};

export const deleteUser = (id) => async (dispatch, getState) => {
    dispatch({ type: USER_DELETE_REQUEST });

    try {
        const { data } = await axios.delete(`/api/users/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getState().userLogin.userInfo.token}`
            }
        });
        dispatch({ type: USER_DELETE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
    dispatch({ type: USER_ADMIN_DETAILS_REQUEST });

    try {
        const { data } = await axios.get(`/api/users/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getState().userLogin.userInfo.token}`
            }
        });
        dispatch({ type: USER_ADMIN_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: USER_ADMIN_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};

export const updateUser = (user) => async (dispatch, getState) => {
    dispatch({ type: USER_ADMIN_UPDATE_REQUEST });

    try {
        const { data } = await axios.put(`/api/users/${user._id}`, user, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getState().userLogin.userInfo.token}`
            }
        });
        dispatch({ type: USER_ADMIN_UPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: USER_ADMIN_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};
