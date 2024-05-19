import {axiosInstance} from "@/utils/axios";

/**
 * 删除预警
 * @param {string} sid
 * @returns
 */
export function DeleteEmergencyDelete(sid: string) {
	return axiosInstance.delete(`/mental/emergency/delete?sid=${sid}`);
}