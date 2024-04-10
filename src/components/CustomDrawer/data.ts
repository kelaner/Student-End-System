import axiosInstance from "@/utils/axios";

export async function StudentSeekHelp(sid: string | undefined, sname: string, date: Date) {
	return await axiosInstance.post(`/mental/emergency/`, {sid: sid, sname: sname, date: date})
}