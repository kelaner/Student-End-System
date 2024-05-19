import {PostEmergencyAdd} from "@/api/postApi";
import {PutStudentChangePassword, PutTeacherChangePassword} from "@/api/putApi";
import {EmergencyAddParams} from "@/api/type";
import {axiosInstance} from "@/utils/axios";
import {getGender} from "@/utils/gender";
import {formatStandardDate} from "@/utils/time";
import {logoutAction, Role, userAtom} from "@/utils/user";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
	Button,
	Card,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Stack,
	TextField,
	Typography
} from "@mui/material";
import Box from "@mui/material/Box";
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {useAtom} from "jotai";
import {usePathname, useSearchParams} from "next/navigation";
import {enqueueSnackbar, SnackbarProvider} from "notistack";
import React, {useState} from 'react';


export default function CustomDrawer({role}: { role?: Role }) {

	const [open, setOpen] = useState<boolean[]>([true, true, true, true, true])
	const [showPassword, setShowPassword] = React.useState(false);
	const path = usePathname()
	const handleLogoutAction = useAtom(logoutAction)
	const [user] = useAtom(userAtom)

	const [showPasswordDialog, setShowPasswordDialog] = useState(false)
	const [password, setPassword] = useState("")
	const [passwordConfirm, setPasswordConfirm] = useState("")
	const [showAIDialog, setShowAIDialog] = useState(false)
	const searchParams = useSearchParams()
	const aiStatus = searchParams.get("ai");


	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	function handleLogout() {
		handleLogoutAction[ 1 ]()
		window.location.replace("/auth/login")
	}


	const handleClick = (index: number) => {
		setOpen((prevState) => {
			const updatedState = [...prevState];
			updatedState[ index ] = !updatedState[ index ];
			return updatedState;
		});
	};

	function handleChangePassword() {
		if (password !== passwordConfirm) {
			enqueueSnackbar("密码不一致", {variant: "error"})
		} else if (password === "" || passwordConfirm === "") {
			enqueueSnackbar("未填写", {variant: "warning"})
		} else {
			if (user?.roles === "student") {
				PutStudentChangePassword(user?.sid ?? "", password).then(res => {
					if (res.data.code === 200) {
						enqueueSnackbar("密码修改成功", {variant: "success"})
						setTimeout(() => {
							window.location.reload()
						}, 1500)

					} else {
						enqueueSnackbar(`密码修改失败：${res.data.msg}`, {variant: "error"})
					}
				})
			} else if (user?.roles === "teacher") {
				PutTeacherChangePassword(user?.tid ?? "", password).then(res => {
					if (res.data.code === 200) {
						enqueueSnackbar("密码修改成功", {variant: "success"})
						setTimeout(() => {
							window.location.reload()
						}, 1500)

					} else {
						enqueueSnackbar(`密码修改失败：${res.data.msg}`, {variant: "error"})
					}
				})
			}

		}
	}


	function handleStudentSeekHelp() {
		const params: EmergencyAddParams = {
			sid: user?.sid,
			sname: user?.sname,
			classid: user?.classid,
			date: formatStandardDate(new Date()),
		}

		axiosInstance(`/mental/emergency/list?sid=${user?.sid}`).then(res => {
			if (res.data.code === 200) {
				enqueueSnackbar("您已请求过帮助，请耐心等待", {variant: "warning"})
				return
			} else {
				PostEmergencyAdd(params).then(res => {
					console.log("res", res)
					if (res.data.code === 200) {
						enqueueSnackbar("请求成功", {variant: "success"})
					} else {
						enqueueSnackbar(`请求失败：${res.data.msg}`, {variant: "error"})
					}

				}).catch(e => {
					enqueueSnackbar(`请求失败：${e}`, {variant: "error"})
				})
			}
		})
	}

	function EnterAITest() {
		const searchParams = new URLSearchParams({
			ai: "open",
		});

		window.open(`/student/test/test?${searchParams}`, "_self");
	}


	return (
		<Box sx={{height: "100vh", background: "linear-gradient(102deg, #F1F5FE 8.4%, #FEF8F1 83.36%)",}}>

			<Card sx={{m: 2, mb: 0, p: 2}}>
				{/*<Typography variant={"subtitle1"} fontWeight={600}>个人信息</Typography>*/}
				<Typography variant={"subtitle1"} fontWeight={600}>工号：{user?.sid ?? user?.tid}</Typography>
				<Typography variant={"subtitle1"} fontWeight={600}>姓名：{user?.sname ?? user?.tname}</Typography>
				{
					user?.roles === "student" &&
            <>
                <Typography variant={"subtitle1"} fontWeight={600}>班级：{user?.classid}</Typography>
                <Typography variant={"subtitle1"} fontWeight={600}>性别：{getGender(user?.sgender)}</Typography>
            </>
				}
			</Card>

			<Dialog open={showPasswordDialog} fullWidth maxWidth={"xs"} onClose={() => setShowPasswordDialog(false)}>
				<DialogTitle>修改密码</DialogTitle>
				<DialogContent>
					<Stack direction={"column"} spacing={2} sx={{mt: 1}}>
						<TextField
							fullWidth
							type={showPassword ? 'text' : 'password'}
							InputProps={{
								endAdornment:
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											edge="end"
										>
											{showPassword ? <Visibility/> : <VisibilityOff/>}
										</IconButton>
									</InputAdornment>
							}}
							label={"密码"}
							placeholder="密码"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<TextField
							fullWidth
							type={showPassword ? 'text' : 'password'}
							InputProps={{
								endAdornment:
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											edge="end"
										>
											{showPassword ? <Visibility/> : <VisibilityOff/>}
										</IconButton>
									</InputAdornment>
							}}
							label={"确认密码"}
							placeholder="确认密码"
							value={passwordConfirm}
							onChange={(e) => setPasswordConfirm(e.target.value)}
						/>
					</Stack>
					<SnackbarProvider/>
				</DialogContent>
				<DialogActions>
					<Button variant={"contained"} onClick={handleChangePassword} sx={{m: 2, mt: 0}}>确认</Button>
				</DialogActions>
			</Dialog>

			<Dialog open={showAIDialog} fullWidth maxWidth={"xs"} onClose={() => setShowAIDialog(false)}>
				<DialogTitle textAlign={"center"}>是否进行AI辅助测试</DialogTitle>
				<DialogContent>
					<Stack direction={"row"} spacing={2} justifyContent={"center"} alignItems={"center"}>
						<Button
							variant={"contained"}
							color={"inherit"}
							onClick={() => setShowAIDialog(false)}
							sx={{m: 2, mt: 0}}>取消</Button>
						<Button
							variant={"contained"}
							color={"primary"}
							onClick={EnterAITest}
							sx={{m: 2, mt: 0}}>确认</Button>
					</Stack>

				</DialogContent>

			</Dialog>

			<List>
				<ListItemButton onClick={() => window.location.replace("/home")}>
					<Typography
						variant={"h6"}
						sx={{width: "100%", color: path === "/home" ? "#2395F1" : "#2B2D30", pl: 1}}>首页</Typography>
				</ListItemButton>

				{
					( role === "student" || user?.roles === "student" ) &&
            <>
                <ListItemButton onClick={() => handleClick(0)}>
                    <Typography variant={"h6"} sx={{width: "100%", color: "#2B2D30", pl: 1}}>消息</Typography>
									{open[ 0 ] ? <ExpandLess/> : <ExpandMore/>}
                </ListItemButton>
                <Collapse in={open[ 0 ]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton
                            onClick={() => window.location.replace("/student/message/meeting")}
                            sx={{
															color: path === "/student/message/meeting" ? "#2395F1" : "#2B2D30",
															pl: 5
														}}>
                            <ListItemText primary="会面安排"/>
                        </ListItemButton>

                        <ListItemButton
                            sx={{color: "#2B2D30", pl: 5}}
                            onClick={handleStudentSeekHelp}
                        >
                            <ListItemText primary="请求帮助"/>
                        </ListItemButton>
                    </List>
                </Collapse>


                <ListItemButton onClick={() => handleClick(1)}>
                    <Typography variant={"h6"} sx={{width: "100%", color: "#2B2D30", pl: 1}}>测试</Typography>
									{open[ 1 ] ? <ExpandLess/> : <ExpandMore/>}
                </ListItemButton>
                <Collapse in={open[ 1 ]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton
                            onClick={() => window.location.replace("/student/test/test")}
                            sx={{
															color: ( path === "/student/test/test" && aiStatus == null ) ? "#2395F1" : "#2B2D30",
															pl: 5
														}}>
                            <ListItemText primary="测试"/>
                        </ListItemButton>

                        <ListItemButton
                            onClick={() => setShowAIDialog(true)}
                            sx={{
															color: ( path === "/student/test/test" && aiStatus === "open" ) ? "#2395F1" : "#2B2D30",
															pl: 5,
															pointerEvents: ( path === "/student/test/test" && aiStatus === "open" ) ? "none" : "auto"
														}}>
                            <ListItemText primary="AI辅助测试"/>
                        </ListItemButton>

                        <ListItemButton
                            onClick={() => window.location.replace("/student/test/log")}
                            sx={{
															color: path === "/student/test/log" ? "#2395F1" : "#2B2D30",
															pl: 5
														}}>
                            <ListItemText primary="记录"/>
                        </ListItemButton>
                    </List>
                </Collapse>

            </>
				}

				{
					( role === "teacher" || user?.roles === "teacher" ) &&
            <>

                <ListItemButton onClick={() => window.location.replace("/teacher/warning")}>
                    <Typography
                        variant={"h6"}
                        sx={{
													width: "100%",
													color: path === "/teacher/warning" ? "#2395F1" : "#2B2D30",
													pl: 1
												}}>预警名单</Typography>
                </ListItemButton>

                <ListItemButton onClick={() => handleClick(2)}>
                    <Typography variant={"h6"} sx={{width: "100%", color: "#2B2D30", pl: 1}}>记录查询</Typography>
									{open[ 2 ] ? <ExpandLess/> : <ExpandMore/>}
                </ListItemButton>
                <Collapse in={open[ 2 ]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton
                            onClick={() => window.location.replace("/teacher/record/test")}
                            sx={{
															color: path === "/teacher/record/test" ? "#2395F1" : "#2B2D30",
															pl: 5
														}}>
                            <ListItemText primary="测试记录"/>
                        </ListItemButton>
                        <ListItemButton
                            onClick={() => window.location.replace("/teacher/record/meet")}
                            sx={{
															color: path === "/teacher/record/meet" ? "#2395F1" : "#2B2D30",
															pl: 5
														}}>
                            <ListItemText primary="会面记录"/>
                        </ListItemButton>
                    </List>
                </Collapse>

            </>
				}
				<ListItemButton onClick={() => handleClick(3)}>
					<Typography variant={"h6"} sx={{width: "100%", color: "#2B2D30", pl: 1}}>设置</Typography>
					{open[ 3 ] ? <ExpandLess/> : <ExpandMore/>}
				</ListItemButton>
				<Collapse in={open[ 3 ]} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItemButton
							onClick={() => setShowPasswordDialog(true)}
							sx={{color: "#2B2D30", pl: 5}}
						>
							<ListItemText primary="重置密码"/>
						</ListItemButton>

						<ListItemButton
							onClick={handleLogout}
							sx={{color: "#2B2D30", pl: 5}}
						>
							<ListItemText primary="退出登录"/>
						</ListItemButton>
					</List>
				</Collapse>


			</List>
		</Box>
	)
}