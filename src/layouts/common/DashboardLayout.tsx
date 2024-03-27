"use client"


import * as React from 'react';
import {useEffect} from 'react';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from "@mui/material/IconButton";
import {Stack, ThemeProvider, Toolbar} from "@mui/material";
import {AppBar, DrawerHeader, drawerWidth, Main, theme} from "@/layouts/themeVariables";
import MenuIcon from "@mui/icons-material/Menu";
import CustomDrawer from "@/components/CustomDrawer";
import {Role} from "@/utils/user";
import {isMobile} from "react-device-detect";

interface Props {
	children: React.ReactNode;
	role?: Role
}

export default function PersistentDrawerLeft({children, role}: Props) {

	const [open, setOpen] = React.useState(false);

	useEffect(() => {
		setOpen(!isMobile)
	}, [])

	const handleDrawerChange = () => {
		setOpen(!open);
	};


	return (
		<Stack direction={"column"}>
			<CssBaseline/>

			<Drawer
				PaperProps={{
					sx: {
						backgroundColor: "#304156",
					},
				}}
				sx={{
					backgroundColor: "#304156",
					width: drawerWidth,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: drawerWidth,
						boxSizing: "border-box",
						boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.08)",
						borderRight: "none",
					},
				}}
				variant="persistent"
				anchor="left"
				open={open}
			>
				<CustomDrawer role={role}/>
			</Drawer>

			<Main open={open}>
				<ThemeProvider theme={theme}>
					<AppBar position="fixed" open={open} sx={{backgroundColor: "#304156"}}>
						<Toolbar>
							<IconButton
								color="inherit"
								aria-label="open drawer"
								onClick={handleDrawerChange}
								edge="start"
								sx={{mr: 2}}
							>
								<MenuIcon sx={{color: "white"}}/>
							</IconButton>
						</Toolbar>
					</AppBar>
				</ThemeProvider>

				<DrawerHeader/>
				{children}

			</Main>

		</Stack>
	);
}


