"use client"

import {useEffect, useState} from 'react';
import {loginAction, Role, userAtom} from "@/utils/user";
import {Button, Card, Container, MenuItem, Select, Stack, TextField, Typography} from "@mui/material";
import {useAtom} from "jotai";
import {StudentLogin, TeacherLogin} from "@/sections/auth/login/data";
import {enqueueSnackbar} from "notistack";

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
		if (password === "" || username === "") {
			enqueueSnackbar("用户名或密码不能为空", {variant: "warning"})
			return
		}

		if (role === "student") {
			StudentLogin(username, password).then(res => {
				console.log("Res", res)
				if (res.data.code === 200) {
					console.log(res.data.row?.filter((i: { sid: string }) => i.sid === username)[ 0 ])
					handleLoginAction[ 1 ]({
						...res.data.row?.filter((i: { sid: string }) => i.sid === username)[ 0 ],
						roles: role
					})
					enqueueSnackbar("登录成功", {variant: "success"})


				} else {
					enqueueSnackbar(`账号或密码错误`, {variant: "error"})
				}

			}).catch(e => {
				console.log("e", e)
				enqueueSnackbar(`登陆错误:${e}`, {variant: "error"})
			})
		} else if (role === "teacher") {
			TeacherLogin(username, password).then(res => {
				console.log("Res", res)
				if (res.data.code === 200) {
					console.log(res.data.row?.filter((i: { tid: string }) => i.tid === username)[ 0 ])
					handleLoginAction[ 1 ]({
						...res.data.row?.filter((i: { tid: string }) => i.tid === username)[ 0 ],
						roles: role
					})
					enqueueSnackbar("登录成功", {variant: "success"})

				} else {
					enqueueSnackbar(`账号或密码错误`, {variant: "error"})
				}

			}).catch(e => {
				console.log("e", e)
				enqueueSnackbar(`登陆错误:${e}`, {variant: "error"})
			})
		}

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
