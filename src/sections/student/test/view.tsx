"use client"

import {PostAiVideo} from "@/api/aiApi";
import {PostEmergencyAdd, PostRecordsList} from "@/api/postApi";
import {EmergencyAddParams, RecordsListParams} from "@/api/type";
import {axiosInstance} from "@/utils/axios";
import {formatStandardDate} from "@/utils/time";
import {userAtom} from "@/utils/user";
import CloseIcon from '@mui/icons-material/Close';
import {Alert, Button, Card, Divider, Stack, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import {useAtom} from "jotai";
import {useSearchParams} from "next/navigation";
import {enqueueSnackbar} from "notistack";
import React, {useEffect, useRef, useState} from 'react';
import {isMobile} from "react-device-detect";
import Draggable from "react-draggable";
import SCL_Data from "./SCL-90.json"


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

	const cameraVideoRef = useRef<HTMLVideoElement>(null);

	const [enablePost, setEnablePost] = useState<boolean>(!( aiStatus === "open" ))

	const [result, setResult] = useState<number>(0)

	const handleClick = () => {

		if (enablePost) {// 计算总分
			const total = scoreList.reduce((prev, curr) => prev + curr, 0)

			// 提交
			console.log(total)

			const params: RecordsListParams = {
				sid: user?.sid,
				date: formatStandardDate(new Date()),
				score: total,
				revise: aiStatus === null ? "N" : "Y",
				rescore: aiStatus === null ? undefined : total + result,
			}

			PostRecordsList(params).then(res => {
				console.log("res", res)
				if (res.data.code === 200) {
					enqueueSnackbar("提交成功", {variant: "success", anchorOrigin: {vertical: 'top', horizontal: 'right'}})

					if (( total + result ) >= 150) {
						axiosInstance(`/mental/emergency/list?sid=${user?.sid}`).then(res => {
							if (res.data.code === 200) {
								// enqueueSnackbar("您已请求过帮助，请耐心等待", {variant: "warning"})
								return
							} else {
								const params: EmergencyAddParams = {
									sid: user?.sid,
									sname: user?.sname,
									classid: user?.classid,
									date: formatStandardDate(new Date()),
								}
								PostEmergencyAdd(params).then(res => {
									console.log("res", res)
									if (res.data.code === 200) {
										enqueueSnackbar("测试分数超过预警阈值，已为您创建预警记录", {variant: "success"})
									} else {
										enqueueSnackbar(`请求失败：${res.data.msg}`, {variant: "error"})
									}

								}).catch(e => {
									enqueueSnackbar(`请求失败：${e}`, {variant: "error"})
								})
							}
						})
					}

					// setTimeout(() => {
					// 	window.location.replace("/student/test/log")
					// }, 2000)

				} else {
					enqueueSnackbar(`提交失败：${res.data.msg}`, {
						variant: "error",
						anchorOrigin: {vertical: 'top', horizontal: 'right'}
					})
				}
			}).catch(e => {
				console.log("e", e)
			})
		} else {
			enqueueSnackbar("请先完成面部信息采集", {
				variant: "warning",
				anchorOrigin: {vertical: 'top', horizontal: 'right'}
			})
		}

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

	useEffect(() => {
		if (aiStatus === "open") {
			const opt = {
				audio: false,
				video: true
			};

			navigator.mediaDevices.getUserMedia(opt)
			.then((mediaStream) => {
				const video = cameraVideoRef.current;
				// 旧的浏览器可能没有srcObject
				if (video) {
					if ('srcObject' in video) {
						video.srcObject = mediaStream;
						video.play().then()
					} else {
						enqueueSnackbar("您的浏览器不支持摄像头访问", {
							variant: "error",
							anchorOrigin: {vertical: 'bottom', horizontal: 'right'}
						})
					}
				}
			})
			.catch((err) => {
				enqueueSnackbar(`未识别到有用设备`, {
					variant: "warning",
					anchorOrigin: {vertical: 'bottom', horizontal: 'right'},
					preventDuplicate: true,
				})

				console.log("error", err)
			});
		}
	}, [aiStatus])


	function startRecording() {
		const video = cameraVideoRef.current;
		if (video && video.srcObject) {
			const chunks: Blob[] = [];

			const recorder = new MediaRecorder(video.srcObject as MediaStream);

			recorder.ondataavailable = function (evt) {
				chunks.push(evt.data);
			}

			recorder.onstop = () => {
				enqueueSnackbar("面部采集结果上传中");
				const blob = new Blob(chunks, {type: 'video/mp4'});

				//创建一个新的FormData实例
				const formData = new FormData();
				//将blob对象添加到formData中
				formData.append('file', blob, "video.mp4");

				PostAiVideo(formData)
				.then(res => {
					if (res.data === 0) {
						enqueueSnackbar("采集成功", {variant: "success", anchorOrigin: {vertical: 'top', horizontal: 'right'}})
						setEnablePost(true)
						setResult(0)
						console.log("res", res)
					} else if (res.data === 1) {
						enqueueSnackbar("采集成功", {variant: "success", anchorOrigin: {vertical: 'top', horizontal: 'right'}})
						setEnablePost(true)
						setResult(150)
						console.log("res", res)
					} else {
						enqueueSnackbar("采集失败", {variant: "error", anchorOrigin: {vertical: 'top', horizontal: 'right'}})
						enqueueSnackbar(res?.data, {
							variant: "warning",
							anchorOrigin: {vertical: 'top', horizontal: 'right'}
						})
						setEnablePost(false)
						console.log("res", res)
						startRecording()
					}

				})
				.catch(e => {
					enqueueSnackbar(`采集失败`, {
						variant: "error",
						anchorOrigin: {vertical: 'top', horizontal: 'right'}
					})
					console.log("error", e)
				})

				// const url = URL.createObjectURL(blob);
				//
				// const a = document.createElement('a');
				// a.setAttribute('style', 'display: none');
				// a.href = url;
				// a.download = 'recorded-video.mp4';
				//
				// document.body.appendChild(a);
				// a.click();
				//
				// window.URL.revokeObjectURL(url);
			}

			enqueueSnackbar("面部采集开始")
			recorder.start();
			setTimeout(function () {
				enqueueSnackbar("面部采集结束");
				recorder.stop();
			}, 10000);
		} else {
			enqueueSnackbar("camera is null or undefined");
		}

	}


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

                    <video
                        autoPlay
                        loop
                        muted
											// controls
                        width="120"
                        height="120"
                        id={"cameraVideo"}
                        onLoadedData={startRecording}
                        ref={cameraVideoRef}
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