export type SearchCondition = {
  userId?: string;
  userName?: string;
  gender?: number;
  departmentId?: number;
  page: number;
  size: number;
};

export type BasicResponseType = {
  code: string;
  errors: [{ [key: string]: string }];
};

export type PagingModeType = "allRows" | "selectedRows";

export type FilterNameTYpe = keyof Omit<SearchCondition, "page" | "size">;
