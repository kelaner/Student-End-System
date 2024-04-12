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
import dayjs from "dayjs";
import {useAtom} from "jotai";
import {userAtom} from "@/utils/user";
import {GetRecordsList} from "@/api/getApi";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";


interface Props {
	sid?: string
}

function LogView(props: Props) {

	const [user] = useAtom(userAtom)

	const {memoizedValue: {data, isLoading}} = GetRecordsList(props.sid ?? user?.sid ?? "")


	function formatMeetingDate(date: Date): string {
		return dayjs(date).format('M月D日 H点m分');
	}

	if (isLoading) {
		return <LoadingScreen/>
	}

	return (
		<Stack direction={"column"} spacing={4}>

			<Card sx={{p: 4}}>
				{data?.row?.length >= 1 ?
					<>
						<Typography variant={"h6"}>{`最新记录：${data?.row.slice().reverse()[ 0 ].sid}`}</Typography>
						<Typography
							variant={"h6"}>{`得分：${data?.row.slice().reverse()[ 0 ].score}${data?.row.slice().reverse()[ 0 ].revise === 'Y' ? `（修正后得分：${data?.row.slice().reverse()[ 0 ].rescore}）` : ''}`}</Typography>
						<Typography variant={"h6"} textAlign={"end"} mt={4}>{data?.row.slice().reverse()[ 0 ].date}</Typography>
					</>
					: <Typography variant={"h6"}>暂无记录</Typography>
				}
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
							{data?.row?.slice().reverse().map((record, index) => (
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
											{record.score}
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
	)
		;
}

export default LogView;
