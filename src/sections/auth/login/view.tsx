"use client"

import {useEffect, useState} from 'react';
import {loginAction, Role, User, userAtom} from "@/utils/user";
import {Button, Card, Container, MenuItem, Select, Stack, TextField, Typography} from "@mui/material";
import {useAtom} from "jotai";
import {StudentLogin} from "@/sections/auth/login/data";
import {StdentInfo} from "@/sections/auth/login/type";

export default function LoginView() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [role, setRole] = useState<Role>('student')

	const handleLoginAction = useAtom(loginAction)
	const [user] = useAtom(userAtom)


	useEffect(() => {
		console.log("user", user)
		if (!!user) {
			window.location.replace("/home")
		}
	}, [user])


	const handleLogin = () => {
		if (role === "student") {
			StudentLogin(username, password).then(res => {
				console.log("Res", res)
				res.data.code
				handleLoginAction[ 1 ](res.data.rows.filter((i: { sid: string }) => i.sid === username)[ 0 ])

				window.location.replace("/home")
			}).catch()
		}
		// try {
		// 	// 模拟登录成功
		// 	const userInfo: Partial<User> = {sid: username, roles: role};
		// 	handleLoginAction[ 1 ](userInfo)
		//
		// 	window.location.replace("/home")
		// } catch (error) {
		// 	// 处理登录失败
		// 	console.error('登录失败:', error);
		// }
	};

	return (
		<Container maxWidth="sm">
			<Stack direction={"column"} alignItems={"center"} justifyContent={"center"} sx={{height: "100vh"}}>
				<Card sx={{p: 4, minWidth: 280}}>
					<Stack direction={"column"} spacing={3} alignItems={"center"}>
						<Typography variant={"h5"}>登录</Typography>

						<Select
							value={role}
							onChange={(e) => setRole(e.target.value as Role)}
							fullWidth
						>
							<MenuItem value="student">学生</MenuItem>
							<MenuItem value="teacher">教师</MenuItem>
							{/*<MenuItem value="admin">管理员</MenuItem>*/}
						</Select>

						<TextField
							fullWidth
							type="text"
							placeholder="用户名"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<TextField
							fullWidth
							type="password"
							placeholder="密码"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<Button variant={"contained"} color={"primary"} onClick={handleLogin}>登录</Button>
					</Stack>
				</Card>
			</Stack>

		</Container>
	);
}
