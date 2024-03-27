import React from 'react';
import {Carousel, Image} from 'antd';
import Box from "@mui/material/Box";

const contentStyle: React.CSSProperties = {
	height: '300px',
	color: '#fff',
	lineHeight: '300px',
	textAlign: 'center',
	background: '#364d79',
	display: "block",
};

const CarouselChart: React.FC = () => (
	<Carousel
		autoplay
		dotPosition={"bottom"}
	>
		<Box sx={contentStyle}>
			<Image alt={""} src={"/png/index (1).jpg"} height={"100%"} width={"100%"} style={{objectFit: 'cover'}}/>
		</Box>
		<Box sx={contentStyle}>
			<Image alt={""} src={"/png/index (1).png"} height={"100%"} width={"100%"} style={{objectFit: 'cover',}}/>
		</Box>
		<Box sx={contentStyle}>
			<Image alt={""} src={"/png/index (2).jpg"} height={"100%"} width={"100%"} style={{objectFit: 'cover',}}/>
		</Box>
		<Box sx={contentStyle}>
			<Image alt={""} src={"/png/index (2).png"} height={"100%"} width={"100%"} style={{objectFit: 'cover',}}/>
		</Box>
	</Carousel>
);

export default CarouselChart;

