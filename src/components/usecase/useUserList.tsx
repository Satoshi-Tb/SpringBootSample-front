import useSWR from "swr";

type BasicResponseType = {
  code: string;
  message: string;
};

export type UserListType = {
  id: string | number;
  userId: string;
  password?: string;
  userName?: string;
  birthday?: string;
  age?: number;
  gender?: number;
  genderName?: string;
  departmentId?: number;
  department?: string;
  role?: string;
  salaryList?: {
    userId: string;
    yearMonth: string;
    salary: number;
  };
};

type ResponseType = { data: UserListType[] } & BasicResponseType;

export const useUserList = (condition?: string) => {
  // データ取得処理
  const fetcher = (input: RequestInfo | URL, init?: RequestInit | undefined) =>
    fetch(input, init).then((res) => res.json());

  const { data, error, isLoading } = useSWR<ResponseType>(
    `http://localhost:8080/api/user/get/list${condition}`,
    fetcher
  );
  console.log("fetch data", data);

  return { userListData: data, hasError: error, isLoading };
};