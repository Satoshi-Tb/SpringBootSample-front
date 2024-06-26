import useSWR from "swr";
import type { BasicResponseType } from "@/TypeDef";
import envConfig from "@/utils/envConfig";

export type CodeType = {
  category: string;
  code: string;
  name: string;
};

export type CategoryCodeListResponseType = {
  data: CodeType[];
} & BasicResponseType;

export const useCategoryCode = (category: string) => {
  // データ取得処理
  const fetcher = (input: RequestInfo | URL, init?: RequestInit | undefined) =>
    fetch(input, init).then((res) => res.json());

  const { data, error, isLoading, mutate } =
    useSWR<CategoryCodeListResponseType>(
      `${envConfig.apiUrl}/api/code/category/${category}`,
      fetcher
    );
  console.log("useCategoryCode:fetch data", data);

  return { categoryCodeListData: data, hasError: error, isLoading, mutate };
};
