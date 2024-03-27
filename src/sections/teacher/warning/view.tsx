"use client"

import React from 'react';
import {Button, Card, Stack, Typography} from "@mui/material";
import {DataGrid, GridColDef, GridRowSelectionModel} from '@mui/x-data-grid';
import {enqueueSnackbar, SnackbarProvider} from "notistack";

export interface Emergency {
	Sid: string; // 学号
	Sname: string; // 姓名
	Date: Date; // 日期
}


function WarningView() {

	const [selected, setSelected] = React.useState<string[]>([]);

	function handleClick() {
		if (selected.length > 0) {
			enqueueSnackbar(`安排学生学号：${selected}`, {variant: "success"})
		} else {
			enqueueSnackbar("未选择学生", {variant: "warning"})
		}

	}

	return (
		<Stack>
			<Card sx={{p: 4}}>

				<Typography variant={"h6"}>
					预警名单
				</Typography>

				<Stack direction={"column"} spacing={2} sx={{py: 2}}>
					<DataGrid
						rows={rows}
						columns={columns}
						initialState={{
							pagination: {
								paginationModel: {page: 0, pageSize: 5},
							},
						}}
						pageSizeOptions={[5, 10, 20, 30]}
						checkboxSelection
						getRowId={row => row.Sid}
						onRowSelectionModelChange={(rowSelectionModel: GridRowSelectionModel) => {
							setSelected(rowSelectionModel as string[])
						}}
					/>
					<Stack direction={"column"} alignItems={"center"}>
						<Button variant={"contained"} onClick={handleClick}>为勾选学生安排会面</Button>
					</Stack>

				</Stack>


			</Card>
			<SnackbarProvider/>
		</Stack>
	);
}

export default WarningView;


const columns: GridColDef[] = [
	{field: 'Sid', headerName: '学号', flex: 1, minWidth: 130},
	{field: 'Sname', headerName: '姓名', flex: 1, minWidth: 130},
	{field: 'Date', headerName: '日期', flex: 1, minWidth: 160, type: 'date'},
];

const rows: Emergency[] = [
	{Sid: '001', Sname: '张三', Date: new Date('2024-03-30')},
	{Sid: '002', Sname: '李四', Date: new Date('2024-03-29')},
	{Sid: '003', Sname: '王五', Date: new Date('2024-03-28')},
	{Sid: '004', Sname: '赵六', Date: new Date('2024-03-27')},
	{Sid: '005', Sname: '钱七', Date: new Date('2024-03-26')},
	{Sid: '006', Sname: '孙八', Date: new Date('2024-03-25')},
	{Sid: '007', Sname: '周九', Date: new Date('2024-03-24')},
	{Sid: '008', Sname: '吴十', Date: new Date('2024-03-23')},
	{Sid: '009', Sname: '郑十一', Date: new Date('2024-03-22')},
	{Sid: '010', Sname: '王十二', Date: new Date('2024-03-21')},
	{Sid: '011', Sname: '刘十三', Date: new Date('2024-03-20')},
	{Sid: '012', Sname: '陈十四', Date: new Date('2024-03-19')},
	{Sid: '013', Sname: '杨十五', Date: new Date('2024-03-18')},
	{Sid: '014', Sname: '黄十六', Date: new Date('2024-03-17')},
	{Sid: '015', Sname: '林十七', Date: new Date('2024-03-16')},
	{Sid: '016', Sname: '张十八', Date: new Date('2024-03-15')},
	{Sid: '017', Sname: '李十九', Date: new Date('2024-03-14')},
	{Sid: '018', Sname: '王二十', Date: new Date('2024-03-13')},
];