import {styled} from "@mui/material/styles";
import {createTheme} from "@mui/material";
import {blue} from "@mui/material/colors";
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import {isMobile} from "react-device-detect";

// 定义抽屉宽度
export const drawerWidth = 230;


// 定义主要内容区域样式
export const Main = styled("main", {
	shouldForwardProp: (prop) => prop !== "open",
})<{
	open?: boolean;
}>(({theme, open}) => ( {
	flexGrow: 1,
	padding: theme.spacing(3),
	transition: theme.transitions.create("margin", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...( open && {
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		width: isMobile ? "100%" : `calc(100% - ${drawerWidth}px)`,
		marginLeft: isMobile ? 0 : `${drawerWidth}px`,
	} ),
} ));

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

export const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({theme, open}) => ( {
	transition: theme.transitions.create(['margin', 'width'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...( open && {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: `${drawerWidth}px`,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	} ),
} ));

// 定义抽屉头部样式
export const DrawerHeader = styled("div")(({theme}) => ( {
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: "flex-end",
} ));

// 创建自定义主题
export const theme = createTheme({
	palette: {
		primary: blue, // 设置主题的主要颜色为teal色调
		secondary: {
			main: "#fff", // 设置主题的次要颜色为白色
		},
	},
});
