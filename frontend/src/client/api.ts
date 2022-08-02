import axios from "axios";

axios.defaults.headers.common["Content-Type"] = `application/json`;

export const setToken = (token: string) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const getRequest = async (url: string) => {
    return await axios.get(url);
};

export const postRequest = async (url: string, data: object) => {
    return await axios.post(url, data);
};

export const putRequest = async (url: string, data: object) => {
    return await axios.put(url, data);
};

export const deleteRequest = async (url: string) => {
    return await axios.delete(url);
};
