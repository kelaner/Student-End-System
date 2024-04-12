import axios, {AxiosRequestConfig} from "axios";

console.log(process.env.NEXT_PUBLIC_API_URL ?? process.env.VERCEL_URL)

const axiosInstance = axios.create({baseURL: process.env.NEXT_PUBLIC_API_URL ?? process.env.VERCEL_URL});

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

