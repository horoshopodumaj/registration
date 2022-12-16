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

api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true;
            try {
                const response = await axios.get(`${URL}/api/refresh`, { withCredentials: true });
                localStorage.setItem("token", response.data.accessToken);
                return api.request(originalRequest);
            } catch (error) {
                console.log("Пользователь не авторизован", error);
            }
        }
        throw error;
    }
);

export default api;
