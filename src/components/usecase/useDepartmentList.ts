import type { BasicResponseType } from "@/TypeDef";
import useSWR from "swr";
import envConfig from "@/utils/envConfig";

export type DepartmentType = {
  departmentId: number;
  departmentName: string;
};

export type DepartmentListResponseTYpe = {
  data: DepartmentType[];
} & BasicResponseType;

// 部署データ取得
export const useDepartmentList = () => {
  const fetcher = (input: RequestInfo | URL, init?: RequestInit | undefined) =>
    fetch(input, init).then((res) => res.json());

  const { data, error, isLoading, mutate } = useSWR<DepartmentListResponseTYpe>(
    `${envConfig.apiUrl}/api/department/all`,
    fetcher
  );

  return { departmentListData: data, hasError: error, isLoading, mutate };
};
