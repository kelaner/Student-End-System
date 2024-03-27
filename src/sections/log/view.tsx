"use client"
import React from 'react';
import {Card, Stack, Typography} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Records} from "@/type/WarningSYS";
import dayjs from "dayjs";

const rows: Records[] = [
	{sid: '记录1', date: new Date(), Score: 80, revise: '否'},
	{sid: '记录2', date: new Date(), Score: 90, revise: '是', rescore: 95},
	{sid: '记录3', date: new Date(), Score: 75, revise: '否'},
	{sid: '记录4', date: new Date(), Score: 85, revise: '是', rescore: 90},
];

function LogView() {

	function formatMeetingDate(date: Date): string {
		return dayjs(date).format('M月D日 H点m分');
	}

	return (
		<Stack direction={"column"} spacing={4}>

			<Card sx={{p: 4}}>
				<Typography variant={"h6"}>{`最新记录：${rows[ 0 ].sid}`}</Typography>
				<Typography
					variant={"h6"}>{`得分：${rows[ 0 ].Score}${rows[ 0 ].revise === '是' ? `(修正后得分：${rows[ 0 ].rescore})` : ''}`}</Typography>
				<Typography variant={"h6"} textAlign={"end"} mt={4}>{rows[ 0 ].date.toDateString()}</Typography>
			</Card>

			<Card sx={{p: 4}}>
				<Typography variant={"h6"}>历史记录</Typography>
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
										得分
									</Typography>
								</TableCell>
								<TableCell align="center">
									<Typography variant={"h6"}>
										是否修正
									</Typography>
								</TableCell>
								<TableCell align="center">
									<Typography variant={"h6"}>
										修正后得分
									</Typography>
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map((record, index) => (
								<TableRow
									key={index}
									sx={{'&:last-child td, &:last-child th': {border: 0}}}
								>
									<TableCell align="center">
										<Typography variant={"subtitle1"}>
											{formatMeetingDate(record.date)}
										</Typography>
									</TableCell>
									<TableCell align="center">
										<Typography variant={"subtitle1"}>
											{record.Score}
										</Typography>
									</TableCell>
									<TableCell align="center">
										<Typography variant={"subtitle1"}>
											{record.revise}
										</Typography>
									</TableCell>
									<TableCell align="center">
										<Typography variant={"subtitle1"}>
											{record.rescore || '-'}
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

export default LogView;
