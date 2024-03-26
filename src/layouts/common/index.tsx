"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import CustomDrawer from "@/components/CustomDrawer";

const drawerWidth = 240;

interface Props {
	children: React.ReactNode;
}

export default function CommonLayouts(props: Props) {
	const {children} = props;

	return (
		<Box sx={{display: 'flex'}}>
			<CssBaseline/>

			<Box
				component="nav"
				sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
				aria-label="mailbox folders"
			>
				<Drawer
					variant="permanent"
					sx={{
						display: {xs: 'none', sm: 'block'},
						'& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
					}}
					open
				>
					<CustomDrawer/>
				</Drawer>
			</Box>
			<Box
				component="main"
				sx={{flexGrow: 1, p: 3, width: {sm: `calc(100% - ${drawerWidth}px)`}}}
			>
				{children}
			</Box>
		</Box>
	);
}
