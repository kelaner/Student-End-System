"use client"

import React from 'react';
import {Button, Card, Dialog, DialogActions, DialogTitle, Stack, Typography} from "@mui/material";
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
import {Icon} from "@iconify/react";
import IconButton from "@mui/material/IconButton";
import {enqueueSnackbar} from "notistack";
import {PutMeetingUpdate} from "@/api/putApi";
import {MeetingUpdateParams} from "@/api/type";

interface Props {
}

function MeetingView(props: Props) {

	const [user] = useAtom(userAtom)
	const {memoizedValue: {data, isLoading}, mutate} = GetMeetingTidOrSid("", user?.tid ?? "")
	const newMessage = data?.row?.filter(i => i.complete === "N")?.[ 0 ]
	const [showDialog, setShowDialog] = React.useState(false)
	const [selectSid, setSelectSid] = React.useState("")
	const [selectTid, setSelectTid] = React.useState("")
	const [selectData, setSelectData] = React.useState("")

	const [selectComplete, setSelectComplete] = React.useState("")


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
							{`${newMessage.tid}老师，您约${newMessage.sid}同学于${formatMeetingDate(newMessage.date)}在${newMessage.place}会谈。`}
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
										接收人
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

								<TableCell align="center">
									<Typography variant={"h6"}>
										操作
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
											{row.sid}
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
									<TableCell align="center">
										<IconButton onClick={() => {
											setSelectSid(row.sid)
											setSelectTid(row.tid)
											setSelectData(row.date)
											setSelectComplete(row.complete)
											setShowDialog(true)
										}}>
											<Icon icon="solar:pen-bold" width={24}/>
										</IconButton>
									</TableCell>

								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>


			</Card>

			<Dialog open={showDialog} fullWidth maxWidth="sm">
				<DialogTitle>{`确认修改对学生${selectSid}的会面记录吗？`}</DialogTitle>

				<DialogActions sx={{p: 3, pt: 0}}>
					<Button
						variant="outlined"
						onClick={() => {
							setSelectSid("")
							setSelectComplete("")
							setShowDialog(false)
						}}
					> 取消 </Button>
					<Button
						variant="contained"
						color="secondary"
						onClick={() => {
							const params: MeetingUpdateParams = {
								sid: selectSid,
								tid: selectTid,
								date: selectData,
								complete: selectComplete === "Y" ? "N" : "Y"
							}

							PutMeetingUpdate(params).then(res => {
								if (res.data.code === 200) {
									mutate().then()
									enqueueSnackbar(`已成功修改对学生${selectSid}的会面记录`, {variant: "success"})
									setTimeout(() => {
										setSelectSid("")
										setShowDialog(false)
									}, 2000)
								} else {
									enqueueSnackbar(`修改对学生${selectSid}的会面记录失败:${res.data.msg}`, {variant: "error"})
								}
							})
						}}>修改</Button>
				</DialogActions>
			</Dialog>

		</Stack>
	);
}

export default MeetingView;