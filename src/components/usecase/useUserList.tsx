import useSWR from "swr";
import type { BasicResponseType, SearchCondition } from "@/TypeDef";
import envConfig from "@/utils/envConfig";

export type UserType = {
  id: string | number;
  userId: string;
  password: string;
  userName: string;
  birthday?: string;
  age?: number;
  gender: number;
  genderName?: string;
  profile?: string;
  department?: {
    departmentId?: number;
    departmentName?: string;
  };
  role?: string;
  salaryList?: {
    userId: string;
    yearMonth: string;
    salary: number;
  };
};

export type UserListResponseType = {
  data: {
    userList: UserType[];
    resultNum: number;
  };
} & BasicResponseType;

const buildParam = (condition: SearchCondition) => {
  return condition
    ? "?" +
        Object.entries(condition)
          .filter(([key, value]) => value !== "")
          .map(([key, value]) => `${key}=${value}`)
          .join("&")
    : "";
};

export const useUserList = (condition?: SearchCondition) => {
  // データ取得処理
  const fetcher = (input: RequestInfo | URL, init?: RequestInit | undefined) =>
    fetch(input, init).then((res) => res.json());

  const { data, error, isLoading, mutate } = useSWR<UserListResponseType>(
    condition
      ? `${envConfig.apiUrl}/api/user/get/list-pager${buildParam(condition)}`
      : null,
    fetcher
  );
  console.log("fetch data", data);

  return { userListData: data, hasError: error, isLoading, mutate };
};
