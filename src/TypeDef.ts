// GETかつ値無し（NULL）を取り扱う場合、文字列型の方が都合がよい
export type SearchCondition = {
  userId?: string;
  userName?: string;
  gender?: string;
  departmentId?: string;
  page: number;
  size: number;
};

export type FilterItem = {
  filterValue: string;
  filterLabel?: string;
  count: number;
};

export type BasicResponseType = {
  code: string;
  errors: [{ [key: string]: string }];
};

export type PagingModeType = "allRows" | "selectedRows";

export type FilterNameTYpe = keyof Omit<SearchCondition, "page" | "size">;

export type FontSizeType = "small" | "medium" | "large";
