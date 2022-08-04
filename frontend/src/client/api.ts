import axios from "axios";

// Set config defaults when creating the instance
const instance = axios.create({
    headers: {
        "Content-Type": `application/json`
    }
});

export const setToken = (token: string) => {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const getRequest = async (url: string) => {
    return await instance.get(url);
};

export const postRequest = async (url: string, data: object) => {
    return await instance.post(url, data);
};

export const putRequest = async (url: string, data: object) => {
    return await instance.put(url, data);
};

export const deleteRequest = async (url: string) => {
    return await instance.delete(url);
};
