import axios from "axios";

// Set config defaults when creating the instance
const instance = axios.create({
    headers: {
        "Content-Type": `application/json`
    }
});

export const getRequest = async (url: string) => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
        const data = JSON.parse(userInfo);
        instance.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    }
    return await instance.get(url);
};

export const postRequest = async (url: string, data: object) => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
        const data = JSON.parse(userInfo);
        instance.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    }
    return await instance.post(url, data);
};

export const putRequest = async (url: string, data: object) => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
        const data = JSON.parse(userInfo);
        instance.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    }
    return await instance.put(url, data);
};

export const deleteRequest = async (url: string) => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
        const data = JSON.parse(userInfo);
        instance.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    }
    return await instance.delete(url);
};
