'use client';

import React from "react";
import DashboardLayout from "@/layouts/common/DashboardLayout";
import {useAtom} from "jotai";
import {userAtom} from "@/utils/user";

type Props = {
	children: React.ReactNode;
};

export default function Layout({children}: Props) {

	const [user] = useAtom(userAtom)

	return (
		<DashboardLayout role={user?.roles}>
			{children}
		</DashboardLayout>
	);
}
