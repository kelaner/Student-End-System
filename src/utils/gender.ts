export const getGender = (gender: string | undefined): string => {
	if (gender === "M") {
		return "男";
	} else if (gender === "W") {
		return "女";
	} else {
		return "";
	}
};
