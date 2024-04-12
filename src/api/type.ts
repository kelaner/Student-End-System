export interface EmergencyAddParams {
	/*学号 */
	sid?: string;

	/*姓名 */
	sname?: string;

	/*日期 */
	date?: string;

	/*班级 */
	classid?: string;
}

export interface MeetingAddParams {
	/*发起人 */
	tid?: string;

	/*接收人 */
	sid?: string;

	/*日期 */
	date?: string;

	/*地点 */
	place?: string;

	/*是否完成 */
	complete?: string;
}

// 参数接口
export interface RecordsListParams {
	/*学号 */
	sid?: string;

	/*时间 */
	date?: string;

	/*得分 */
	score?: number;

	/*是否修正 */
	revise?: string;

	/*修正得分 */
	rescore?: number;
}

// 参数接口
export interface MeetingUpdateParams {
	/*发起人 */
	tid?: string;

	/*接收人 */
	sid?: string;

	/*日期 */
	date?: string;

	/*地点 */
	place?: string;

	/*是否完成 */
	complete?: string;
}



