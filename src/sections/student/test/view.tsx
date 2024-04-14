"use client"

import React, {useState} from 'react';
import {Alert, Button, Card, Divider, Stack, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import SCL_Data from "./SCL-90.json"
import {enqueueSnackbar} from "notistack";
import {PostRecordsList} from "@/api/postApi";
import {RecordsListParams} from "@/api/type";
import {useAtom} from "jotai";
import {userAtom} from "@/utils/user";
import {formatStandardDate} from "@/utils/time";
import {isMobile} from "react-device-detect";
import {useSearchParams} from "next/navigation";
import Draggable from "react-draggable";
import {Image} from "antd";


interface SCL90_Type {
	[ key: string ]: string;
}

const SCL90: SCL90_Type = SCL_Data

const options: { id: number, value: number, title: string }[] = [
	{
		id: 1,
		value: 1,
		title: "从无",
	},
	{
		id: 2,
		value: 2,
		title: "很轻",
	},
	{
		id: 3,
		value: 3,
		title: "中等",
	},
	{
		id: 4,
		value: 4,
		title: "偏重",
	},
	{
		id: 5,
		value: 5,
		title: "严重",
	},
]


function TestView() {
	const [user] = useAtom(userAtom)
	const [topicIndex, setTopicIndex] = useState<number>(0)
	const [open, setOpen] = useState<boolean>(false);
	const [scoreList, setScoreList] = useState<number[]>([])
	const searchParams = useSearchParams()
	const aiStatus = searchParams.get("ai");
	console.log(aiStatus)

	const handleClick = () => {

		// 计算总分
		const total = scoreList.reduce((prev, curr) => prev + curr, 0)

		// 提交
		console.log(total)

		const params: RecordsListParams = {
			sid: user?.sid,
			date: formatStandardDate(new Date()),
			score: total,
			revise: "N",
		}

		PostRecordsList(params).then(res => {
			console.log("res", res)
			if (res.data.code === 200) {
				enqueueSnackbar("提交成功", {variant: "success", anchorOrigin: {vertical: 'top', horizontal: 'right'}})

				setTimeout(() => {
					window.location.replace("/student/test/log")
				}, 1500)

			} else {
				enqueueSnackbar(`提交失败：${res.data.msg}`, {
					variant: "error",
					anchorOrigin: {vertical: 'top', horizontal: 'right'}
				})
			}
		}).catch(e => {
			console.log("e", e)
		})

	};

	const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	const action = (
		<React.Fragment>
			<IconButton
				size="small"
				aria-label="close"
				color="inherit"
				onClick={handleClose}
			>
				<CloseIcon fontSize="small"/>
			</IconButton>
		</React.Fragment>
	);

	return (
		<Box sx={{width: "100%", height: "90vh"}}>
			<Stack direction={"row"} justifyContent={"center"} alignItems={"center"} sx={{width: "100%", height: "100%"}}>


				{aiStatus === "open" && <Draggable>
            <Card
                sx={{
									position: "fixed",
									right: 20,
									top: "8vh",
									zIndex: 9999,
									background: "white",
									p: 1,
									borderRadius: "10px"
								}}
            >
                <Stack direction={"column"} justifyContent={"space-around"} alignItems={"center"}>
                    <Typography
                        variant={"subtitle2"}
                        sx={{textAlign: "center", fontWeight: 600}}
                    >摄像头拍摄画面</Typography>

                    <Image
                        alt={"摄像头拍摄画面"}
											// height={120}
                        width={120}
                        preview={false}
                        style={{pointerEvents: "none", borderRadius: "10px"}}
											// src="/png/face.png"
                        src={"https://th.bing.com/th/id/R.aa3ba4056a9d6ced55e671b8621d94c9?rik=i75n5d153tyz4g&riu=http%3a%2f%2f5b0988e595225.cdn.sohucs.com%2fimages%2f20180227%2f79b0ff0ec9da4aa1b3d2e7910cc0e0f3.gif&ehk=WccpCOIYlOZ7vUzUH%2brLfdbxSe6nOwUly74KbJDvv%2bY%3d&risl=&pid=ImgRaw&r=0"}
                    />
                </Stack>
            </Card>

        </Draggable>}


				{Object.keys(SCL90).map((topic: string, index: number) => {

					return (
						<>
							{topicIndex === index &&

                  <Card sx={{p: 2, width: "100%", mx: isMobile ? 1 : 4}} key={index}>
                      <Stack direction={"column"} justifyContent={"center"} mb={2} spacing={1}>
                          <Typography variant={"h6"} whiteSpace={"nowrap"} sx={{textAlign: "center", fontWeight: 600}}>
                              题号:{index + 1}/总题数:{Object.keys(SCL90).length}
                          </Typography>
												{/*<Typography*/}
												{/*    variant={"h6"}*/}
												{/*    sx={{textAlign: "center", fontWeight: 600,color:"#2395F1"}}*/}
												{/*>题目</Typography>*/}
                          <Typography
                              variant={"h6"}
                              sx={{textAlign: "center", fontWeight: 600}}
                          >{SCL90[ topic ]}</Typography>
                      </Stack>


                      <Divider/>

                      <Stack direction={"column"} p={4} mb={2}>
												{options.map((i, iIndex) => (
													<Button
														variant={scoreList[ index ] === i.value ? "contained" : "outlined"}
														sx={{width: "100%", m: 1}}
														key={iIndex}
														onClick={() => {
															setScoreList((prevState) => {
																let newState = [...prevState]
																newState[ index ] = i.value
																return newState
															})
															if (topicIndex !== Object.keys(SCL90).length - 1 && !scoreList[ index ]) {
																setTopicIndex(() => topicIndex + 1)
															} else if (topicIndex === Object.keys(SCL90).length - 1 && scoreList[ index ]) {
																enqueueSnackbar("测试题目已全部完成，请点击提交上传", {
																	variant: "info",
																	anchorOrigin: {vertical: 'top', horizontal: 'right'}
																})
															}

														}}
													>
														{i.title}
													</Button>
												))}
                      </Stack>

                      <Stack direction={"row"} justifyContent={"space-between"} mb={2}>
                          <Button disabled={topicIndex === 0} onClick={() => setTopicIndex(topicIndex - 1)}>
                              <Typography variant={"h6"} whiteSpace={"nowrap"}>
                                  上一题
                              </Typography>
                          </Button>
                          <Button
                              onClick={() => {
																if (topicIndex === Object.keys(SCL90).length - 1) {
																	handleClick()
																} else {
																	setTopicIndex(() => topicIndex + 1)
																}
															}}
                              disabled={!scoreList[ index ]}
                          >
                              <Typography variant={"h6"} whiteSpace={"nowrap"}>
																{topicIndex === Object.keys(SCL90).length - 1 ? "提交" : "下一题"}
                              </Typography>
                          </Button>
                      </Stack>

                      <Snackbar
                          anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                          open={open}
                          autoHideDuration={2000}
                          onClose={handleClose}
                          action={action}
                      >
                          <Alert
                              onClose={handleClose}
                              severity="success"
                              variant="filled"
                              sx={{width: '100%'}}
                          >
                              已提交
                          </Alert>
                      </Snackbar>
                  </Card>}
						</>
					)

				})}


			</Stack>
		</Box>
	);
}

export default TestView;