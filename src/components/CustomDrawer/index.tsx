import React from 'react';
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {Card, Typography} from "@mui/material";
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Box from "@mui/material/Box";
import {usePathname} from "next/navigation";

function CustomDrawer() {

	const [open1, setOpen1] = React.useState(true);
	const [open2, setOpen2] = React.useState(true);
	const [open3, setOpen3] = React.useState(true);
	const path = usePathname()


	const handleClick1 = () => {
		setOpen1(!open1);
	};

	const handleClick2 = () => {
		setOpen2(!open2);
	};

	const handleClick3 = () => {
		setOpen3(!open3);
	};

	return (
		<Box sx={{height: "100%", backgroundColor: "#304156"}}>

			<Card sx={{my: 4, mx: 2, p: 2, pb: 4}}>
				<Typography variant={"h6"}>个人信息</Typography>
				<Typography variant={"h6"}>姓名：</Typography>
				<Typography variant={"h6"}>班级：</Typography>
				<Typography variant={"h6"}>性别：</Typography>
			</Card>


			<List>

				<ListItemButton onClick={() => window.location.replace("/")}>
					<Typography
						variant={"h6"}
						sx={{width: "100%", color: path === "/" ? "#389CFD" : "#9AAABB", pl: 1}}>首页</Typography>
				</ListItemButton>

				<ListItemButton onClick={handleClick1}>
					<Typography variant={"h6"} sx={{width: "100%", color: "#9AAABB", pl: 1}}>消息</Typography>
					{open1 ? <ExpandLess/> : <ExpandMore/>}
				</ListItemButton>
				<Collapse in={open1} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItemButton
							onClick={() => window.location.replace("/message/meeting")}
							sx={{
								backgroundColor: "#1F2D3D",
								color: path === "/message/meeting" ? "#389CFD" : "#9AAABB",
								pl: 5
							}}>
							<ListItemText primary="会面安排"/>
						</ListItemButton>

						<ListItemButton sx={{backgroundColor: "#1F2D3D", color: "#9AAABB", pl: 5}}>
							<ListItemText primary="请求帮助"/>
						</ListItemButton>
					</List>
				</Collapse>


				<ListItemButton onClick={handleClick2}>
					<Typography variant={"h6"} sx={{width: "100%", color: "#9AAABB", pl: 1}}>测试</Typography>
					{open2 ? <ExpandLess/> : <ExpandMore/>}
				</ListItemButton>
				<Collapse in={open2} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItemButton
							onClick={() => window.location.replace("/test/test")}
							sx={{
								backgroundColor: "#1F2D3D",
								color: path === "/test/test" ? "#389CFD" : "#9AAABB",
								pl: 5
							}}>
							<ListItemText primary="测试"/>
						</ListItemButton>

						<ListItemButton
							onClick={() => window.location.replace("/test/log")}
							sx={{
								backgroundColor: "#1F2D3D",
								color: path === "/test/log" ? "#389CFD" : "#9AAABB",
								pl: 5
							}}>
							<ListItemText primary="记录"/>
						</ListItemButton>
					</List>
				</Collapse>


				<ListItemButton onClick={handleClick3}>
					<Typography variant={"h6"} sx={{width: "100%", color: "#9AAABB", pl: 1}}>设置</Typography>
					{open3 ? <ExpandLess/> : <ExpandMore/>}
				</ListItemButton>
				<Collapse in={open3} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItemButton sx={{backgroundColor: "#1F2D3D", color: "#9AAABB", pl: 5}}>
							<ListItemText primary="重置密码"/>
						</ListItemButton>

						<ListItemButton sx={{backgroundColor: "#1F2D3D", color: "#9AAABB", pl: 5}}>
							<ListItemText primary="退出登录"/>
						</ListItemButton>
					</List>
				</Collapse>


			</List>

		</Box>
	)
		;
}

export default CustomDrawer;