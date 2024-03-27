"use client"

import React, {useState} from 'react';
import {Alert, Button, Card, Divider, Stack, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface Props {

}

const metaData = [
	{
		title: "这是第1题的题目",
		topic_id: 3,
		total: 3,
		option: ["选项1", "选项2", "选项3", "选项4", "选项5"],
	},
	{
		title: "这是第2题的题目",
		topic_id: 3,
		total: 3,
		option: ["选项1", "选项2", "选项3",],
	},
	{
		title: "这是第3题的题目",
		topic_id: 3,
		total: 3,
		option: ["选项1", "选项2",],
	}
]

function TestView(props: Props) {
	const [topicIndex, setTopicIndex] = useState<number>(0)

	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen(true);
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
				{metaData.map((topic, index) => {

					return (
						<>
							{topicIndex === index &&
                  <Card sx={{p: 2, width: "100%", mx: 4}} key={index}>
                      <Stack direction={"row"} justifyContent={"space-between"} mb={2}>
                          <Typography variant={"h6"} whiteSpace={"nowrap"}>题目:{topic.title}</Typography>
                          <Typography variant={"h6"} whiteSpace={"nowrap"}>
                              题号:{topic.topic_id}/总题数:{topic.total}
                          </Typography>
                      </Stack>

                      <Divider/>

                      <Stack direction={"column"} p={4} mb={8}>
												{topic.option.map((i, iIndex) => (
													<Button variant={"outlined"} sx={{width: "100%", m: 1}} key={iIndex}>{i}</Button>
												))}
                      </Stack>

                      <Stack direction={"row"} justifyContent={"space-between"} mb={2}>
                          <Button disabled={topicIndex === 0} onClick={() => setTopicIndex(topicIndex - 1)}>
                              <Typography variant={"h6"} whiteSpace={"nowrap"}>
                                  上一题
                              </Typography>
                          </Button>
                          <Button onClick={() => {
														if (topicIndex !== metaData.length - 1) {
															setTopicIndex(topicIndex + 1)
														} else {
															handleClick()
														}
													}}>
                              <Typography variant={"h6"} whiteSpace={"nowrap"}>
																{topicIndex === metaData.length - 1 ? "提交" : "下一题"}
                              </Typography>
                          </Button>
                      </Stack>

                      <Snackbar
                          anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                          open={open}
                          autoHideDuration={6000}
                          onClose={handleClose}
                          action={action}
                      >
                          <Alert
                              onClose={handleClose}
                              severity="success"
                              variant="filled"
                              sx={{width: '100%'}}
                          >
                              提交
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