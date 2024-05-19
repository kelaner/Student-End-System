import axios, {AxiosRequestConfig} from "axios";

const HOST_URL = "http://101.200.210.137:8080";

export const axiosInstance = axios.create({baseURL: HOST_URL});


axiosInstance.interceptors.response.use(
	res => res,
	error => Promise.reject(( error.response && error.response.data ) || "请求异常")
);

axiosInstance.interceptors.request.use(req => {
	req.headers[ "Content-Type" ] = "application/json"
	req.baseURL = HOST_URL

	return req;
});


export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
	const [url, config] = Array.isArray(args) ? args : [args];

	const res = await axiosInstance.get(url, {...config});

	return res.data;
};


const FACE_URL = "http://106.14.145.73:5000";

export const axiosInstance2 = axios.create({baseURL: FACE_URL});


axiosInstance2.interceptors.response.use(
	res => res,
	error => Promise.reject(( error.response && error.response.data ) || "请求异常")
);

axiosInstance2.interceptors.request.use(req => {
	req.baseURL = FACE_URL;

	// req.headers[ "Content-Type" ] = "video/mp4";
	// req.headers[ "Accept" ] = "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7";
	// req.headers[ "Accept-Language" ] = "zh-CN,zh;q=0.9,en;q=0.8";
	// req.headers[ "Cache-Control" ] = "max-age=0";
	// req.headers[ "Proxy-Connection" ] = 'keep-alive';
	// req.headers[ "Upgrade-Insecure-Requests" ] = "1";
	// req.headers[ "Referrer" ] = FACE_URL;
	// req.headers[ "ReferrerPolicy" ] = "strict-origin-when-cross-origin";

	return req;
});

export const fetcher2 = async (args: string | [string, AxiosRequestConfig]) => {
	const [url, config] = Array.isArray(args) ? args : [args];

	const res = await axiosInstance.get(url, {...config});

	return res.data;
};

