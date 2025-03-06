import useSWR from "swr";
import type { BasicResponseType, SearchCondition } from "@/TypeDef";
import envConfig from "@/utils/envConfig";
import { use } from "react";
import { useRealTimeUpdateState } from "../store/useRealTimeUpdateState";

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

/**
 * GETによる検索処理
 */
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

/**
 * POSTによる検索処理
 * @param condition
 * @returns
 */
export const useUserListPost = (condition?: SearchCondition) => {
  const realTimeUpdate = useRealTimeUpdateState();

  // データ取得処理
  const fetcher = async ([url, condition]: [
    url: string,
    condition: SearchCondition
  ]) => {
    // 発生したエラーは、useSWRのerror変数にセットされる
    // throw new Error("error test");
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(condition),
    });
    console.log("useUserListPost success");
    return res.json();
  };

  // keyを[url, token1, token2, ...]形式で指定する。キャッシュのkeyは配列要素の組み合わせとなる
  // tokenに検索条件を指定することで、post処理でも検索条件ごとにキャッシュを有効にできる
  // fetcher関数にはkeyに指定した配列がそのまま引数として渡る
  // urlにnullを指定すると、フェッチ処理キャンセル（のはず）
  // 詳細：https://swr.vercel.app/ja/docs/arguments
  const { data, error, isLoading, mutate } = useSWR(
    condition
      ? [`${envConfig.apiUrl}/api/user/get/list-pager`, condition]
      : null,
    fetcher,
    { revalidateOnFocus: realTimeUpdate }
  );
  console.log("useUserListPost>fetch condition", condition);
  console.log("useUserListPost>fetch data", data);

  return { userListData: data, hasError: error, isLoading, mutate };
};
