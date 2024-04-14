
"use client"


import * as React from 'react';
import {useEffect} from 'react';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from "@mui/material/IconButton";
import {Divider, Stack, ThemeProvider, Toolbar} from "@mui/material";
import {AppBar, DrawerHeader, drawerWidth, Main, theme} from "@/layouts/themeVariables";
import MenuIcon from "@mui/icons-material/Menu";
import CustomDrawer from "@/components/CustomDrawer";
import {Role} from "@/utils/user";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {isMobile} from "react-device-detect";

interface Props {
	children: React.ReactNode;
	role?: Role
}

export default function PersistentDrawerLeft({children, role}: Props) {

	const [open, setOpen] = React.useState(true);

	useEffect(() => {
		setOpen(!isMobile)
	}, [])

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};


	return (
		<Stack direction={"column"}>
			<CssBaseline/>
			<ThemeProvider theme={theme}>


				<AppBar position="fixed" open={open}>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={handleDrawerOpen}
							edge="start"
							sx={{mr: 2, ...( open && {display: 'none'} )}}
						>
							<MenuIcon/>
						</IconButton>

					</Toolbar>
				</AppBar>
			</ThemeProvider>

			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					'& .MuiDrawer-paper': {
						width: drawerWidth,
						boxSizing: 'border-box',
					},
				}}
				variant="persistent"
				anchor="left"
				open={open}
			>
				<DrawerHeader sx={{background: "linear-gradient(102deg, #F1F5FE 8.4%, #FEF8F1 83.36%)"}}>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
					</IconButton>
				</DrawerHeader>
				<Divider/>
				<CustomDrawer role={role}/>
			</Drawer>


			<Main open={open}>


				<DrawerHeader/>
				{children}

			</Main>

		</Stack>
	);
}


