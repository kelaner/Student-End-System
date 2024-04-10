import React from "react";
import {closeSnackbar, SnackbarProvider as NotistackProvider} from 'notistack';
import IconButton from '@mui/material/IconButton';
import {Icon} from '@iconify/react';


type Props = {
	children: React.ReactNode;
};

export default function SnackbarProvider({children}: Props) {

	return (
		<NotistackProvider
			anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
			action={(snackbarId) => (
				<IconButton size="small" onClick={() => closeSnackbar(snackbarId)} sx={{p: 0.5}}>
					<Icon width={16} icon="mingcute:close-line"/>
				</IconButton>
			)}
		>
			{children}
		</NotistackProvider>
	);
}
