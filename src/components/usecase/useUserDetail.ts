import useSWR from "swr";
import type { BasicResponseType } from "@/TypeDef";
import { UserType } from "./useUserList";
import envConfig from "@/utils/envConfig";

export type UserDetailResponseType = {
  data: { user: UserType; nextUserId?: string; beforeUserId?: string };
} & BasicResponseType;

export const useUserDetail = (userId: string | undefined) => {
  // データ取得処理
  const fetcher = (input: RequestInfo | URL, init?: RequestInit | undefined) =>
    fetch(input, init).then((res) => res.json());

  const key = userId
    ? `${envConfig.apiUrl}/api/user/detail/${userId}`
    : undefined;
  const { data, error, isLoading, mutate } = useSWR<UserDetailResponseType>(
    key,
    fetcher
  );
  console.log("useUserDetail", data);

  return { userData: data, hasError: error, isLoading, mutate };
};
