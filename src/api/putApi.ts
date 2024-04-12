import {MeetingUpdateParams} from "@/api/type";
import axiosInstance from "@/utils/axios";


/**
 * 修改会议记录
 * @param {object} params 会议表
 * @param {string} params.tid 发起人
 * @param {string} params.sid 接收人
 * @param {object} params.date 日期
 * @param {string} params.place 地点
 * @param {string} params.complete 是否完成
 * @returns
 */
export function PutMeetingUpdate(params: MeetingUpdateParams) {
	return axiosInstance.put(`/mental/meeting/update`, params);
}

/**
 * 学生重置密码
 * @param {string} sid
 * @param {string} spass
 * @returns
 */
export function PutStudentChangePassword(sid: string, spass: string) {
	return axiosInstance.put(`/mental/student/reset?sid=${sid}&spass=${spass}`);
}

/**
 * 教师重置密码
 * @param {string} tid
 * @param {string} tpass
 * @returns
 */
export function PutTeacherChangePassword(tid: string, tpass: string) {
	return axiosInstance.put(`/mental/teacher/reset?tid=${tid}&tpass=${tpass}`);
}