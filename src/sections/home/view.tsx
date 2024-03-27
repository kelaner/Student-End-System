"use client"

import React from 'react';
import {Grid, Stack, Typography} from "@mui/material";
import CarouselChart from "@/components/CarouselChart/CarouselChart";
import Box from "@mui/material/Box";


interface Props {

}

function HomeView(props: Props) {
	return (
		<Stack direction={"column"}>
			<Box sx={{width: "100%"}}>
				<CarouselChart/>
			</Box>
			<Box sx={{width: "100%", p: 2, my: 2, backgroundColor: "#D9D9D9"}}>
				<Typography variant="body1">
					文字栏内容，随意替换即可。
				</Typography>
			</Box>

			<Grid container spacing={2} m={4}>
				<Grid item xs={6} sx={{p: 2}}>
					<Typography>文章名：人工智能在医疗领域的应用</Typography>
				</Grid>
				<Grid item xs={6} sx={{p: 2}}>
					<Typography>日期：2024年3月27日</Typography>
				</Grid>
				<Grid item xs={6} sx={{p: 2}}>
					<Typography>文章名：未来的可持续能源发展趋势</Typography>
				</Grid>
				<Grid item xs={6} sx={{p: 2}}>
					<Typography>日期：2024年3月27日</Typography>
				</Grid>
			</Grid>

		</Stack>
	);
}

export default HomeView;