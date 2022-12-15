import axios from "axios";
import { URL } from "../App";

const api = axios.create({
    withCredentials: true,
    baseURL: URL,
});

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
});

export default api;
