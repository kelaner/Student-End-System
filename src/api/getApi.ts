import {fetcher} from "@/utils/axios";
import useSWR from "swr";
import {useMemo} from "react";

export interface StandardRes {
	/* */
	msg: string;

	/* */
	row: any[];

	/* */
	code: number;

	/* */
	total: number;
}

/**
 * 预警查询
 * @param {string} sid
 * @returns
 */
export function GetEmergencyList(sid: string) {
	const {data, isLoading, error, mutate} = useSWR(`/mental/emergency/list?sid=${sid}`, fetcher)

	const memoizedValue = useMemo(
		() => ( {
			data: ( data as StandardRes ) || null,
			isLoading: isLoading,
			error: error,
		} ),
		[data, isLoading, error],
	);

	return {memoizedValue, mutate};
}


/**
 * 查询classid下的预警
 * @param {string} classid
 * @returns
 */
export function GetEmergencyClassId(classid: string) {
	const {data, isLoading, error, mutate} = useSWR(`/mental/emergency/listClassid?classid=${classid}`, fetcher)

	const memoizedValue = useMemo(
		() => ( {
			data: ( data as StandardRes ) || null,
			isLoading: isLoading,
			error: error,
		} ),
		[data, isLoading, error],
	);

	return {memoizedValue, mutate};
}

/**
 * 会议记录列表
 * @param {string} sid
 * @param {string} tid
 * @returns
 */
export function GetMeetingTidOrSid(sid: string, tid: string) {

	const {data, isLoading, error, mutate} = useSWR(`/mental/meeting/list?sid=${sid}&tid=${tid}`, fetcher)

	const memoizedValue = useMemo(
		() => ( {
			data: ( data as StandardRes ) || null,
			isLoading: isLoading,
			error: error,
		} ),
		[data, isLoading, error],
	);

	return {memoizedValue, mutate};
}

/**
 * 作答记录查询
 * @param {string} sid
 * @returns
 */
export function GetRecordsList(sid: string) {

	const {data, isLoading, error, mutate} = useSWR(`/mental/records/list?sid=${sid}`, fetcher)

	const memoizedValue = useMemo(
		() => ( {
			data: ( data as StandardRes ) || null,
			isLoading: isLoading,
			error: error,
		} ),
		[data, isLoading, error],
	);

	return {memoizedValue, mutate};
}