import axios from "axios";
import {HOST_API} from "@/sections/global-config";


const axiosInstance = axios.create({baseURL: HOST_API});

axiosInstance.interceptors.response.use(
	res => res,
	error => Promise.reject(( error.response && error.response.data ) || "请求异常")
);

export default axiosInstance;
