"use client"

import React, {useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField} from "@mui/material";
import LogView from "@/sections/student/log/view";

function TestView() {

	const [sid, setSid] = useState("")
	const [open, setOpen] = useState(true)

	function handleSearch() {
		setOpen(false)
	}

	return (
		<Stack>
			{!open && <LogView sid={sid}/>}

			<Dialog open={open} fullWidth>
				<DialogTitle>记录查询</DialogTitle>
				<DialogContent>
					<TextField
						fullWidth
						type="text"
						label={"学号"}
						placeholder="学号"
						value={sid}
						sx={{mt: 2}}
						onChange={(e) => setSid(e.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button variant={"contained"} onClick={handleSearch} sx={{m: 2, mt: 0}}>查询</Button>
				</DialogActions>
			</Dialog>
		</Stack>
	);
}

export default TestView;