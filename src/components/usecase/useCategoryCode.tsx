import useSWR from "swr";
import type { BasicResponseType } from "@/TypeDef";

export type CodeType = {
  category: string;
  code: string;
  name: string;
};

type ResponseType = { data: CodeType[] } & BasicResponseType;

export const useCategoryCode = (category: string) => {
  // データ取得処理
  const fetcher = (input: RequestInfo | URL, init?: RequestInit | undefined) =>
    fetch(input, init).then((res) => res.json());

  const { data, error, isLoading } = useSWR<ResponseType>(
    `http://localhost:8080/api/code/category/${category}`,
    fetcher
  );
  console.log("fetch data", data);

  return { categoryCodeListData: data, hasError: error, isLoading };
};
