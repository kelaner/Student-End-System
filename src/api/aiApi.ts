import {axiosInstance2} from "@/utils/axios";


export function PostAiVideo(file: FormData) {
	return axiosInstance2.post(`/upload`, file);
}