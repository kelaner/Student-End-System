"use client"

import React, {useEffect, useState} from 'react';
import {
	Button,
	Card,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Popover,
	Stack,
	TextField,
	Typography
} from "@mui/material";
import {DataGrid, GridActionsCellItem, GridColDef, GridRowSelectionModel} from '@mui/x-data-grid';
import {enqueueSnackbar} from "notistack";
import {useAtom} from "jotai";
import {userAtom} from "@/utils/user";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {GetEmergencyClassId} from "@/api/getApi";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import {PostMeetingAdd} from "@/api/postApi";
import {MeetingAddParams} from "@/api/type";
import {DeleteEmergencyDelete} from "@/api/deleteApi";
import {Icon} from "@iconify/react";

function WarningView() {

	const [user] = useAtom(userAtom)
	const [selected, setSelected] = React.useState<string[]>([]);
	const [selectClass, setSelectClass] = React.useState<string>(user?.classid?.split(",")[ 0 ] ?? "")
	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
	const open = Boolean(anchorEl);
	const {memoizedValue: {data, isLoading}, mutate} = GetEmergencyClassId(selectClass)
	const [showDialog, setShowDialog] = useState(false)
	const [meetTime, setMeetTime] = useState("")
	const [meetPlace, setMeetPlace] = useState("")
	const [showDeleteDialog, setShowDeleteDialog] = useState(false)
	const [deleteSid, setDeleteSid] = useState("")
	const [deleteSname, setDeleteSname] = useState("")


	const columns: GridColDef[] = [
		{field: 'sid', headerName: '学号', flex: 1, minWidth: 130},
		{field: 'sname', headerName: '姓名', flex: 1, minWidth: 130},
		{field: 'date', headerName: '日期', flex: 1, minWidth: 160},
		{
			type: "actions",
			field: 'actions',
			headerName: "操作",
			minWidth: 50,
			align: "center",
			sortable: false,
			disableColumnMenu: true,
			getActions: (params) => [
				<GridActionsCellItem
					key={params.row.sid}
					icon={<Icon icon="solar:trash-bin-trash-bold" width={24} color={"red"}/>}
					label="删除"
					onClick={() => deleteFunc(params.row.sid, params.row.sname)}
					sx={{color: "error.main"}}
				/>
			]
		},
	];


	useEffect(() => {
		console.log("data", data)
	}, [data])

	useEffect(() => {
		setSelectClass(user?.classid?.split(",")[ 0 ] ?? "")
	}, [user?.classid])

	function deleteFunc(sid: string, sname: string) {
		setDeleteSid(sid)
		setDeleteSname(sname)
		setShowDeleteDialog(true)
	}

	const handleChange = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	function handleClick() {
		if (selected.length > 0) {
			setShowDialog(true)
			// enqueueSnackbar(`安排学生学号：${selected}`, {variant: "success"})
		} else {
			enqueueSnackbar("未选择学生", {variant: "warning"})
		}
	}

	if (isLoading) {
		return <LoadingScreen/>
	}

	return (
		<Stack>
			<Card sx={{p: 4}}>

				<Stack direction={"row"} justifyContent={"space-between"}>
					<Typography variant={"h6"}>
						预警名单
					</Typography>

					<>
						<Button
							variant={"contained"}
							color={"warning"}
							onClick={handleChange}
						>
							{`选择班级：${selectClass}`}
						</Button>
						<Popover
							open={open}
							anchorEl={anchorEl}
							onClose={handleClose}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'right',
							}}
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
						>
							{
								user?.classid?.split(",").map((i, index) => {
									return (
										<ListItemButton key={index} onClick={() => {
											setSelectClass(i)
											handleClose()
										}}>
											<ListItemText>{i}</ListItemText>
										</ListItemButton>
									)
								})
							}
						</Popover>
					</>


				</Stack>


				<Stack direction={"column"} spacing={4} sx={{py: 2, minHeight: "63vh"}}>
					<DataGrid
						rows={data?.row ?? []}
						columns={columns}
						initialState={{
							pagination: {
								paginationModel: {page: 0, pageSize: 5},
							},
						}}
						pageSizeOptions={[5, 10, 20, 30]}
						checkboxSelection
						disableMultipleRowSelection
						hideFooterSelectedRowCount
						getRowId={row => row.sid}
						onRowSelectionModelChange={(rowSelectionModel: GridRowSelectionModel) => {
							setSelected(rowSelectionModel as string[])
						}}
						sx={{overflowY: "hidden"}}
					/>

					<Stack direction={"column"} alignItems={"center"}>
						<Button variant={"contained"} onClick={handleClick}>为勾选学生安排会面</Button>
					</Stack>

				</Stack>


			</Card>


			<Dialog open={showDeleteDialog} fullWidth maxWidth="sm">
				<DialogTitle>{`确认删除学生${deleteSname}(${deleteSid})的预警记录吗？`}</DialogTitle>
				<DialogContent>该操作不可逆。</DialogContent>
				<DialogActions sx={{p: 3, pt: 0}}>
					<Button
						variant="outlined"
						onClick={() => {
							setDeleteSname("")
							setDeleteSid("")
							setShowDeleteDialog(false)
						}}
					> 取消 </Button>
					<Button
						variant="contained"
						color="error"
						onClick={() => {
							DeleteEmergencyDelete(deleteSid).then(res => {
								if (res.data.code === 200) {
									mutate().then()
									enqueueSnackbar(`已成功删除学生${deleteSname}(${deleteSid})的预警记录`, {variant: "success"})

								} else {
									enqueueSnackbar(`删除学生${deleteSname}(${deleteSid})的预警记录失败:${res.data.msg}`, {variant: "error"})
								}
							})

							setTimeout(() => {
								setDeleteSname("")
								setDeleteSid("")
								setShowDeleteDialog(false)
							}, 2000)
						}}>删除</Button>
				</DialogActions>
			</Dialog>


			<Dialog open={showDialog}>
				<DialogTitle>{`为学生${selected[ 0 ]}安排会面`}</DialogTitle>

				<DialogContent>
					<TextField
						variant={"outlined"}
						fullWidth
						label={"会面时间:YYYY-MM-DD"}
						value={meetTime}
						onChange={(e) => setMeetTime(e.target.value)}
						sx={{mt: 2, height: "100%"}}
					/>

					<TextField
						variant={"outlined"}
						fullWidth
						label={"会面地点"}
						value={meetPlace}
						onChange={(e) => setMeetPlace(e.target.value)}
						sx={{mt: 2, height: "100%"}}
					/>

				</DialogContent>

				<DialogActions sx={{p: 3, pt: 0}}>
					<Button variant={"contained"} onClick={() => {
						setShowDialog(false)
						setMeetPlace("")
						setMeetTime("")
					}}>取消</Button>
					<Button variant={"contained"} color={"secondary"} onClick={() => {
						const params: MeetingAddParams = {
							tid: user?.tid,
							sid: selected[ 0 ],
							date: meetTime,
							place: meetPlace,
							complete: "N",
						}

						PostMeetingAdd(params).then(res => {
							if (res.data.code === 200) {
								DeleteEmergencyDelete(selected[ 0 ]).then(res => {
									if (res.data.code === 200) {
										mutate().then()
										enqueueSnackbar(`已成功删除学生${selected[ 0 ]}的预警记录`, {variant: "success"})

									} else {
										enqueueSnackbar(`删除学生${selected[ 0 ]}的预警记录失败:${res.data.msg}`, {variant: "error"})
									}
								})
								enqueueSnackbar(`已成功安排学生${selected[ 0 ]}会面`, {variant: "success"})
								setTimeout(() => {
									setShowDialog(false)
									setMeetPlace("")
									setMeetTime("")
								}, 2000)

							} else {
								enqueueSnackbar(`安排学生${selected[ 0 ]}会面失败:${res.data.msg}`, {variant: "error"})
							}
						}).catch(e => console.log("e", e))
					}}>确定</Button>
				</DialogActions>
			</Dialog>
		</Stack>
	);
}

export default WarningView;


