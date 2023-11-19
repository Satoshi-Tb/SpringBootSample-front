import useSWR from "swr";
import type { BasicResponseType } from "@/TypeDef";
import { UserType } from "./useUserList";

export type UserDetailResponseType = {
  data: UserType;
} & BasicResponseType;

export const useUserDetail = (userId: string | undefined) => {
  // データ取得処理
  const fetcher = (input: RequestInfo | URL, init?: RequestInit | undefined) =>
    fetch(input, init).then((res) => res.json());

  const key = userId
    ? `http://localhost:8080/api/user/detail/${userId}`
    : undefined;
  const { data, error, isLoading, mutate } = useSWR<UserDetailResponseType>(
    key,
    fetcher
  );
  console.log("useUserDetail", data);

  return { userData: data, hasError: error, isLoading, mutate };
};
