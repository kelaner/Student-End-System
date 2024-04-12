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
import {GetMeetingTidOrSid} from "@/api/getApi";
import {useAtom} from "jotai";
import {userAtom} from "@/utils/user";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import {formatMeetingDate} from "@/utils/time";

interface Props {
}

function MeetingView(props: Props) {

	const [user] = useAtom(userAtom)

	const {memoizedValue: {data, isLoading}} = GetMeetingTidOrSid(user?.sid ?? "", "")
	console.log("data", data)

	const newMessage = data?.row?.filter(i => i.complete === "N")?.[ 0 ]


	if (isLoading) {
		return <LoadingScreen/>
	}

	return (
		<Stack>
			<Card sx={{p: 4}}>
				<Typography variant={"h6"}>
					最新消息：
				</Typography>

				{
					newMessage ?
						<Typography variant={"h6"}>
							{`${newMessage.sid}同学，${newMessage.tid}老师约您于${formatMeetingDate(newMessage.date)}在${newMessage.place}会谈。`}
						</Typography>
						:
						<Typography variant={"h6"}>
							暂无最新会谈消息。
						</Typography>
				}

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
							{data?.row.map((row, index) => (
								<TableRow
									key={index}
									sx={{'&:last-child td, &:last-child th': {border: 0}}}
								>
									<TableCell align="center">
										<Typography variant={"subtitle1"}>
											{formatMeetingDate(row.date)}
										</Typography>
									</TableCell>
									<TableCell align="center">
										<Typography variant={"subtitle1"}>
											{row.tid}
										</Typography>
									</TableCell>
									<TableCell align="center">
										<Typography variant={"subtitle1"}>
											{row.place}
										</Typography>
									</TableCell>
									<TableCell align="center">
										<Typography variant={"subtitle1"} sx={{color: row.complete === "N" ? "red" : "green"}}>
											{row.complete}
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