import type { BasicResponseType } from "@/TypeDef";
import useSWR from "swr";

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
    `http://localhost:8080/api/department/all`,
    fetcher
  );
  console.log("useDepartmentList:fetch data", data);

  return { departmentListData: data, hasError: error, isLoading, mutate };
};
