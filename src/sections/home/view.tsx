"use client"

import React from 'react';
import {Container, Stack, Typography} from "@mui/material";
import CarouselChart from "@/components/CarouselChart/CarouselChart";
import Box from "@mui/material/Box";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useAtom} from "jotai";
import {userAtom} from "@/utils/user";


function HomeView() {

	const [user] = useAtom(userAtom)

	console.log("user", user)

	const rows = [
		{id: 1, name: "人工智能在医疗领域的应用", date: "2024年3月27日"},
		{id: 2, name: "未来的可持续能源发展趋势", date: "2022年6月2日"},
	]

	return (
		<Container>
			<Stack direction={"column"}>
				<Box sx={{width: "100%"}}>
					<CarouselChart/>
				</Box>

				<Box sx={{width: "100%", p: 2, my: 2, backgroundColor: "#D9D9D9"}}>
					{/*<Typography variant="body1">*/}
					{/*	文字栏内容，随意替换即可。*/}
					{/*</Typography>*/}
				</Box>

				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell align="center">文章名</TableCell>
								<TableCell align="center">日期</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map((row) => (
								<TableRow
									key={row.id}
									sx={{'&:last-child td, &:last-child th': {border: 0}}}
								>
									<TableCell align="center">{row.name}</TableCell>
									<TableCell align="center">{row.date}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>


			</Stack>
		</Container>
	);
}

export default HomeView;