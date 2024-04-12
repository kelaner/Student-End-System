import axiosInstance from "@/utils/axios";
import {EmergencyAddParams, MeetingAddParams, RecordsListParams} from "@/api/type";


/**
 * 新增预警
 * @param {object} params 预警名单表
 * @param {string} params.sid 学号
 * @param {string} params.sname 姓名
 * @param {object} params.date 日期
 * @param {string} params.classid 班级
 * @returns
 */
export function PostEmergencyAdd(params: EmergencyAddParams) {
	return axiosInstance.post(`/mental/emergency/add`, params);
}

/**
 * 新增会议记录
 * @param {object} params 会议表
 * @param {string} params.tid 发起人
 * @param {string} params.sid 接收人
 * @param {object} params.date 日期
 * @param {string} params.place 地点
 * @param {string} params.complete 是否完成
 * @returns
 */
export function PostMeetingAdd(params: MeetingAddParams) {
	return axiosInstance.post(`/mental/meeting/add`, params);
}

/**
 * 新增作答记录
 * @param {object} params 学生作答记录表
 * @param {string} params.sid 学号
 * @param {object} params.date 时间
 * @param {number} params.score 得分
 * @param {string} params.revise 是否修正
 * @param {number} params.rescore 修正得分
 * @returns
 */
export function PostRecordsList(params: RecordsListParams) {
	return axiosInstance.post(`/mental/records/add`, params);
}