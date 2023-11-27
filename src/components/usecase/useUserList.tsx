import useSWR from "swr";
import type { BasicResponseType } from "@/TypeDef";

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

export const useUserList = (condition?: string) => {
  // データ取得処理
  const fetcher = (input: RequestInfo | URL, init?: RequestInit | undefined) =>
    fetch(input, init).then((res) => res.json());

  // const { data, error, isLoading, mutate } = useSWR<UserListResponseType>(
  //   `http://localhost:8080/api/user/get/list-pager${condition}`,
  //   fetcher
  // );
  const { data, error, isLoading, mutate } = useSWR<UserListResponseType>(
    `http://localhost:3000/api/user/get/list-pager${condition}`,
    fetcher
  );
  console.log("fetch data", data);

  return { userListData: data, hasError: error, isLoading, mutate };
};
