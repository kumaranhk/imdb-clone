import axios from 'axios';
import { toast } from 'react-toastify';

const instance = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,

});

instance.interceptors.request.use(
    (config) => {
        const access_token = localStorage.getItem("token");
        if (access_token) {
            config.headers["Authorization"] = `Bearer ${access_token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)

)

instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        console.log(error)
        toast.error(error.response.data.msg || 'Error while fetching');
        if (error.response && error.response.status === 401) {
            console.log("Unauthenticated, logging out ...");
            localStorage.clear();
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default instance;