import type {Metadata} from "next";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {AntdRegistry} from '@ant-design/nextjs-registry';
import React from "react";
import {SnackbarProvider} from "@/components/SnackbarProvider";


export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({children}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
		<body>

		<SnackbarProvider>
			<AntdRegistry>
				{children}
			</AntdRegistry>
		</SnackbarProvider>
		</body>
		</html>
	);
}
