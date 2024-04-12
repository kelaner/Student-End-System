import dayjs from "dayjs";

export function formatStandardDate(date: Date): string {
	return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
}

export function formatMeetingDate(date: Date | string): string {
	return dayjs(date).format('YYYY年M月D日');
}