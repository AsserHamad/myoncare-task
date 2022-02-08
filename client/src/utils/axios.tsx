import axios from "axios";
import { baseURL } from "./apis";

const HTTP = axios.create({
    withCredentials: false,
    baseURL
});

HTTP.interceptors.request.use(async req => {
    const token : string | null = localStorage.getItem('accessToken');
    if(req.headers && token) {
        req.headers.authorization = token;
    }
    return req;
})

HTTP.interceptors.response.use(
    async req => 
        Promise.resolve(req), 
    async err => 
        Promise.reject(err)
);

export default HTTP;