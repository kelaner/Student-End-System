"use client"

import React from 'react';
import {Card, Stack, Typography} from "@mui/material";
import {Meeting} from "@/type/WarningSYS";
import dayjs from 'dayjs';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface Props {

}

const metaMeeting: Meeting = {
	tid: "发起人1", // 发起人
	Sid: "接收人1",// 接收人
	Date: new Date(), // 日期
	Place: "地点1", // 地点
	Complete: "否", // 是否完成
}

function createData(
	tid: string,
	Sid: string,
	Date: Date,
	Place: string,
	Complete: string
) {
	return {tid, Sid, Date, Place, Complete};
}

const rows: Meeting[] = [
	createData('发起人1', '接收人1', new Date(), '地点1', '否'),
	createData('发起人2', '接收人2', new Date(), '地点2', '否'),
	createData('发起人3', '接收人3', new Date(), '地点3', '是'),
	createData('发起人4', '接收人4', new Date(), '地点4', '是'),
	createData('发起人5', '接收人5', new Date(), '地点5', '是'),
];

function MeetingView(props: Props) {

	function formatMeetingDate(date: Date): string {
		return dayjs(date).format('M月D日 H点m分');
	}

	return (
		<Stack>

			<Card sx={{p: 4}}>
				<Typography variant={"h6"}>
					最新消息：
				</Typography>
				<Typography variant={"h6"}>
					{`${metaMeeting.Sid}同学，${metaMeeting.tid}老师约您于${formatMeetingDate(metaMeeting.Date)}在${metaMeeting.Place}会谈`}
				</Typography>
			</Card>

			<Card sx={{p: 4, mt: 8}}>
				<Typography variant={"h6"}> 历史记录 </Typography>
				<TableContainer component={Paper} sx={{my: 2}}>
					<Table sx={{minWidth: 650}}>
						<TableHead>
							<TableRow>
								<TableCell align="center">
									<Typography variant={"h6"}>
										时间
									</Typography>
								</TableCell>
								<TableCell align="center">
									<Typography variant={"h6"}>
										发起人
									</Typography>
								</TableCell>
								<TableCell align="center">
									<Typography variant={"h6"}>
										地点
									</Typography>
								</TableCell>
								<TableCell align="center">
									<Typography variant={"h6"}>
										是否完成
									</Typography>
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map((row, index) => (
								<TableRow
									key={index}
									sx={{'&:last-child td, &:last-child th': {border: 0}}}
								>
									<TableCell align="center">
										<Typography variant={"subtitle1"}>
											{formatMeetingDate(row.Date)}
										</Typography>
									</TableCell>
									<TableCell align="center">
										<Typography variant={"subtitle1"}>
											{row.tid}
										</Typography>
									</TableCell>
									<TableCell align="center">
										<Typography variant={"subtitle1"}>
											{row.Place}
										</Typography>
									</TableCell>
									<TableCell align="center">
										<Typography variant={"subtitle1"} sx={{color: row.Complete === "否" ? "red" : "green"}}>
											{row.Complete}
										</Typography>
									</TableCell>

								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>


			</Card>

		</Stack>
	);
}

export default MeetingView;