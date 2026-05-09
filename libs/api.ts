import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 10000,
});

api.interceptors.request.use(
    (config) => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        if (config.data instanceof FormData) {
            delete config.headers["Content-Type"];
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                if (typeof window !== "undefined") {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    window.location.href = "/Login";
                }
            }
            return Promise.reject(error.response.data);
        }
        return Promise.reject({ message: "ไม่สามารถติดต่อเซิร์ฟเวอร์ได้" });
    }
);

export default api;