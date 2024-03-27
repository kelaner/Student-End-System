// 定义用户信息接口
import {atomWithStorage} from "jotai/utils";
import {Student, Teacher} from "@/type/WarningSYS";
import {atom} from 'jotai';

// 定义 User 接口
export interface User extends Student, Teacher {
	roles: Role;
}

// 定义角色类型
export type Role = keyof typeof RoleValues;

export const RoleValues = {
	admin: 0,
	student: 1,
	teacher: 2,
};

// 定义用户状态 atom
export const userAtom = atomWithStorage<Partial<User> | null>("userStorage", null);

// 存储用户登录状态，默认为未登录状态


// 用于登录的 action，接受用户信息并更新登录状态和当前用户信息
export const loginAction = atom(null, (get, set, userInfo: Partial<User>) => {
	set(userAtom, userInfo);
});

// 创建一个用于注销的 action，清除当前用户信息并更新登录状态为未登录
export const logoutAction = atom(null, (get, set) => {
	set(userAtom, null);
});

