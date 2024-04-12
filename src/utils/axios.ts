import axios, {AxiosRequestConfig} from "axios";
import {HOST_API} from "@/sections/global-config";


const axiosInstance = axios.create({baseURL: HOST_API});

axiosInstance.interceptors.response.use(
	res => res,
	error => Promise.reject(( error.response && error.response.data ) || "请求异常")
);

export default axiosInstance;

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
	const [url, config] = Array.isArray(args) ? args : [args];

	const res = await axiosInstance.get(url, {...config});

	return res.data;
};

