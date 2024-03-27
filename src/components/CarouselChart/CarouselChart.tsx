import React from 'react';
import {Carousel} from 'antd';
import Box from "@mui/material/Box";

const contentStyle: React.CSSProperties = {
	height: '300px',
	color: '#fff',
	lineHeight: '300px',
	textAlign: 'center',
	background: '#364d79',
};

const CarouselChart: React.FC = () => (
	<Carousel
		autoplay
		dotPosition={"bottom"}
	>
		<Box sx={contentStyle}>
			<img alt={""} src={"/png/index (1).jpg"} width={"100%"}/>
		</Box>
		<Box sx={contentStyle}>
			<img alt={""} src={"/png/index (1).png"} width={"100%"}/>
		</Box>
		<Box sx={contentStyle}>
			<img alt={""} src={"/png/index (2).jpg"} width={"100%"}/>
		</Box>
		<Box sx={contentStyle}>
			<img alt={""} src={"/png/index (2).png"} width={"100%"}/>
		</Box>
	</Carousel>
);

export default CarouselChart;
