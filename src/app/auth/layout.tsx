'use client';

import React from "react";
import DashboardLayout from "@/layouts/common/DashboardLayout";

type Props = {
	children: React.ReactNode;
};

export default function Layout({children}: Props) {
	return (
		<>
			{children}
		</>
	);
}
