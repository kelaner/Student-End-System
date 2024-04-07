import axiosInstance from "@/utils/axios";

export async function StudentLogin(sid: string, spass: string) {
	return await axiosInstance.get(`/mental/student/list?sid=${sid}&spass=${spass}`)
}