import axios from "axios";
import { getToken } from "../redux/slices/authSlice";
import { useAppSelector } from "../redux/hooks";

interface Headers {
    "Content-Type": string;
    Authorization?: string | null;
}

type Options = {
    headers: Headers;
};

let options: Options = {
    headers: {
        "Content-Type": "application/json"
    }
};

export const getRequest = async (url: string, authenticatedRequest: boolean) => {
    if (authenticatedRequest) {
        options.headers.Authorization = useAppSelector((state) => getToken(state));
    }
    return await axios.get(url, options);
};

export const postRequest = async (url: string, data: object, authenticatedRequest: boolean) => {
    if (authenticatedRequest) {
        options.headers.Authorization = useAppSelector((state) => getToken(state));
    }
    return await axios.post(url, data, options);
};

export const putRequest = async (url: string, data: object, authenticatedRequest: boolean) => {
    if (authenticatedRequest) {
        options.headers.Authorization = useAppSelector((state) => getToken(state));
    }
    return await axios.put(url, data, options);
};

export const deleteRequest = async (url: string, authenticatedRequest: boolean) => {
    if (authenticatedRequest) {
        options.headers.Authorization = useAppSelector((state) => getToken(state));
    }
    return await axios.delete(url, options);
};
