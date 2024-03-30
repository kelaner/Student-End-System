// Student 表
export interface Student {
	sid: string; // 学号/账号
	sname: string; // 姓名
	sgender: string; // 性别
	classid: string; // 班级
	spass: string; // 密码
}

// Teacher 表
export interface Teacher {
	tid: string; // 工号/账号
	tname: string; // 姓名
	tpass: string; // 密码
}

// Classes 表
export interface Classes {
	classid: string; // 班级
	Tid: string; // 负责教师工号
}

// Records 表
export interface Records {
	sid: string; // 学号
	date: Date; // 时间
	Score: number; // 得分
	revise: string; // 是否修正
	rescore?: number; // 修正得分（可为空）
}

// Emergency 表
export interface Emergency {
	Sid: string; // 学号
	Sname: string; // 姓名
	Date: Date; // 日期
}

// Meeting 表
export interface Meeting {
	tid: string; // 发起人
	Sid: string; // 接收人
	Date: Date; // 日期
	Place: string; // 地点
	Complete: string; // 是否完成
}
