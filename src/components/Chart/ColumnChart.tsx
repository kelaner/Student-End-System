"use client";

import {Typography} from "@mui/material";
import {useEffect, useState} from "react";
// ----------------------------------------------------------------------

type Props = {
	series: {
		name: string;
		type: string;
		data: number[];
	}[];
	labels: string[]
};

export default function MixedChart(props: Props) {
	const [Chart, setChart] = useState<any>();

	useEffect(() => {
		import("react-apexcharts").then((mod) => {
			setChart(() => mod.default);
		});
	}, []);

	const chartOptions = {
		stroke: {
			width: [3, 2, 3],
			curve: "smooth" as "smooth",
		},
		plotOptions: {
			bar: {
				borderRadius: 10,
				columnWidth: "40%",
			},
		},

		fill: {
			opacity: [0.25, 0.55, 1],
			gradient: {
				inverseColors: false,
				shade: 'light',
				type: "vertical",
				opacityFrom: 0.85,
				opacityTo: 0.15,
				stops: [0, 100, 100, 100]
			}
		},
		labels: props.labels,
		xaxis: {
			type: 'category' as "category",
		},
		yaxis: {
			min: 0,
			max: 500,
		},
		tooltip: {
			shared: true,
			intersect: false,
			y: {
				formatter: (value: number) => {
					if (typeof value !== "undefined") {
						return `${value.toFixed(0)} 分`;
					}
					return value;
				},
			},
		},
	}

	return (
		<>
			{
				!( props.labels.length >= 1 ) ?
					<Typography variant={"h5"}>暂无测试记录</Typography> :
					<>
						{Chart &&
                <Chart
                    dir="ltr"
                    type="area"
                    series={props.series}
                    options={chartOptions}
                    height={350}
                    style={{minWidth: "90%"}}
                />
						}
					</>
			}
		</>
	);
}
