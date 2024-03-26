import React from 'react';
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ListItemText from "@mui/material/ListItemText";
import {Card, Typography} from "@mui/material";

function CustomDrawer() {

	return (
		<div>

			<Card sx={{my: 4, mx: 2, p: 2, pb: 8}}>
				<Typography variant={"h6"}>个人信息</Typography>
				<Typography variant={"h6"}>姓名：</Typography>
				<Typography variant={"h6"}>班级：</Typography>
				<Typography variant={"h6"}>性别：</Typography>
			</Card>

			<List>
				{['消息', '测试', '设置'].map((text, index) => (
					<ListItem key={text} disablePadding>
						<ListItemButton>
							<Typography variant={"h6"} sx={{
								textAlign: "center",
								fontWeight: 600,
								width: "100%"
							}}>{text}</Typography>
						</ListItemButton>
					</ListItem>
				))}
			</List>

		</div>
	);
}

export default CustomDrawer;